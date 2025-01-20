document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('cookieModal');
    const customModal = document.getElementById('customModal');
    const consentStatus = document.getElementById('consentStatus');
    const buyDrinkStatus = document.getElementById('buyDrinkStatus');
    const deviceInfoTable = document.getElementById('deviceInfoTable');
    const cookieTable = document.getElementById('cookieTable');
    const dataCollected = document.getElementById('dataCollected');

    // Show modal on page load
    modal.style.display = 'block';

    // Utility function to set a cookie
    function setCookie(name, value, hours) {
        const d = new Date();
        d.setTime(d.getTime() + (hours * 60 * 60 * 1000)); // Convert hours to milliseconds
        const expires = "expires=" + d.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
        console.log(`Cookie set: ${name}=${value}; ${expires}`); // Debugging
    }

    // Utility function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim(); // Remove leading spaces
            if (cookie.startsWith(nameEQ)) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
    }

    // Utility function to get all cookies
    function getAllCookies() {
        const cookies = document.cookie.split(';');
        const cookieData = [];
        for (let cookie of cookies) {
            const [key, value] = cookie.trim().split('=');
            if (key && value !== undefined) {
                cookieData.push({ key, value });
            }
        }
        return cookieData;
    }

    // Gather device data
    function getDeviceData() {
        return {
            ScreenWidth: window.screen.width,
            ScreenHeight: window.screen.height,
            Browser: navigator.userAgent,
            Language: navigator.language,
            Platform: navigator.platform,
        };
    }

    // Collect data based on enabled cookies
    function collectData() {
        const data = [];
        if (getCookie('analytics') === 'enabled') {
            data.push(`Screen Resolution: ${window.screen.width}x${window.screen.height}`);
            data.push(`Browser: ${navigator.userAgent}`);
            data.push(`Language: ${navigator.language}`);
            data.push(`Platform: ${navigator.platform}`);
        }
        if (getCookie('marketing') === 'enabled') {
            data.push('You agreed to "Buy the Devs a Drink!"');
        }

        dataCollected.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            dataCollected.appendChild(li);
        });
    }

    // Button event handlers
    document.getElementById('acceptAll').addEventListener('click', () => {
        setCookie('consent', 'all', 1); // Store for 1 hour
        setCookie('analytics', 'enabled', 1); // Enable all data tracking
        setCookie('marketing', 'enabled', 1); // Enable marketing cookies
        updateDashboard();
        modal.style.display = 'none';
    });

    document.getElementById('acceptNecessary').addEventListener('click', () => {
        setCookie('consent', 'necessary', 1);
        setCookie('analytics', 'disabled', 1); // Disable analytics
        setCookie('marketing', 'disabled', 1); // Disable marketing
        updateDashboard();
        modal.style.display = 'none';
    });

    document.getElementById('customSettings').addEventListener('click', () => {
        modal.style.display = 'none';
        customModal.style.display = 'block';
    });

    document.getElementById('saveCustomSettings').addEventListener('click', () => {
        const analyticsEnabled = document.getElementById('analyticsCookie').checked;
        const marketingEnabled = document.getElementById('marketingCookie').checked;

        // Set cookies based on user selection
        setCookie('consent', 'custom', 1);
        setCookie('analytics', analyticsEnabled ? 'enabled' : 'disabled', 1);
        setCookie('marketing', marketingEnabled ? 'enabled' : 'disabled', 1);

        updateDashboard();
        customModal.style.display = 'none';
    });

    // Update the dashboard
    function updateDashboard() {
        // Debugging: Log all cookies
        console.log("All Cookies:", document.cookie);

        // Update consent status
        const consent = getCookie('consent') || 'Pending';
        const buyDrink = getCookie('marketing') === 'enabled' ? 'Yes' : 'No';

        console.log("Consent Status:", consent); // Debugging
        console.log("Buy Drink Status:", buyDrink); // Debugging

        consentStatus.textContent = `Consent: ${consent}`;
        buyDrinkStatus.textContent = `Buy the Devs a Drink: ${buyDrink}`;
        collectData();

        // Update device info
        const deviceData = getDeviceData();
        deviceInfoTable.innerHTML = '';
        for (const [key, value] of Object.entries(deviceData)) {
            const row = `<tr><td>${key}</td><td>${value}</td></tr>`;
            deviceInfoTable.innerHTML += row;
        }

        // Update all cookies
        const allCookies = getAllCookies();
        cookieTable.innerHTML = '';
        allCookies.forEach(({ key, value }) => {
            const row = `<tr><td>${key}</td><td>${key === 'analytics' ? 'Analytics' : key === 'marketing' ? 'Marketing' : 'Functional'}</td><td>${value}</td></tr>`;
            cookieTable.innerHTML += row;
        });
    }

    // Initialize the dashboard
    updateDashboard();
});







