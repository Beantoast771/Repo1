document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('cookieModal');
    const consentStatus = document.getElementById('consentStatus');
    const buyDrinkStatus = document.getElementById('buyDrinkStatus');
    const deviceInfoTable = document.getElementById('deviceInfoTable');
    const cookieTable = document.getElementById('cookieTable');

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
            Browser: navigator.userAgent
        };
    }

    // Button event handlers
    document.getElementById('acceptAll').addEventListener('click', () => {
        setCookie('consent', 'all', 1); // Store for 1 hour
        setCookie('buyDrink', 'yes', 1); // Auto-set "Buy the Devs a Drink"
        updateDashboard();
        modal.style.display = 'none';
    });

    document.getElementById('acceptNecessary').addEventListener('click', () => {
        setCookie('consent', 'necessary', 1);
        setCookie('buyDrink', 'no', 1); // Auto-set "Buy the Devs a Drink"
        updateDashboard();
        modal.style.display = 'none';
    });

    document.getElementById('customSettings').addEventListener('click', () => {
        setCookie('consent', 'custom', 1);
        setCookie('buyDrink', 'yes', 1); // Auto-set "Buy the Devs a Drink"
        updateDashboard();
        modal.style.display = 'none';
    });

    // Update the dashboard
    function updateDashboard() {
        // Debugging: Log all cookies
        console.log("All Cookies:", document.cookie);

        // Update consent status
        const consent = getCookie('consent') || 'Pending';
        const buyDrink = getCookie('buyDrink') || 'Pending';
        console.log("Consent Status:", consent); // Debugging
        console.log("Buy Drink Status:", buyDrink); // Debugging

        consentStatus.textContent = `Consent: ${consent}`;
        buyDrinkStatus.textContent = `Buy the Devs a Drink: ${buyDrink}`;

        // Update device info
        const deviceData = getDeviceData();
        deviceInfoTable.innerHTML = '';
        for (const [key, value] of Object.entries(deviceData)) {
            const row = `<tr><td>${key}</td><td>${value}</td></tr>`;
            deviceInfoTable.innerHTML += row;
        }

        // Update all cookies
        const allCookies = getAllCookies();
        console.log("Parsed Cookies:", allCookies); // Debugging
        cookieTable.innerHTML = '';
        allCookies.forEach(({ key, value }) => {
            const row = `<tr><td>${key}</td><td>${value}</td></tr>`;
            cookieTable.innerHTML += row;
        });
    }

    // Initialize the dashboard
    updateDashboard();
});






