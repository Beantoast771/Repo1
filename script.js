document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('cookieModal');
    const customModal = document.getElementById('customModal');
    const consentStatus = document.getElementById('consentStatus');
    const buyDrinkStatus = document.getElementById('buyDrinkStatus');
    const deviceInfoTable = document.getElementById('deviceInfoTable');
    const cookieTable = document.getElementById('cookieTable');
    const dataCollected = document.getElementById('dataCollected');

    // User activity tracking
    const userSessionData = {
        clicks: 0,
        mouseMoves: 0,
        timeSpent: 0,
        geolocation: null,
        referrer: document.referrer || "Direct Access",
        connectionType: navigator.connection ? navigator.connection.effectiveType : "Unknown",
    };

    let mapInstance = null; // Store Leaflet map instance

    // Show modal on page load
    modal.style.display = 'block';

    // Increment clicks
    document.addEventListener('click', () => {
        userSessionData.clicks += 1;
    });

    // Track mouse movement
    document.addEventListener('mousemove', () => {
        userSessionData.mouseMoves += 1;
    });

    // Track time spent on page
    setInterval(() => {
        userSessionData.timeSpent += 1; // Increment every second
    }, 1000);

    // Refresh mouse clicks and movements every 10 seconds
    setInterval(() => {
        collectData();
        updateDashboard();
    }, 10000);

    // Gather geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userSessionData.geolocation = `${position.coords.latitude}, ${position.coords.longitude}`;
                initializeMap(position.coords.latitude, position.coords.longitude);
                updateDashboard(); // Refresh dashboard when geolocation is available
            },
            (error) => {
                userSessionData.geolocation = "Permission Denied";
                updateDashboard(); // Refresh dashboard if denied
            }
        );
    } else {
        userSessionData.geolocation = "Not Supported";
    }

    // Utility function to set a cookie
    function setCookie(name, value, hours) {
        const d = new Date();
        d.setTime(d.getTime() + (hours * 60 * 60 * 1000)); // Convert hours to milliseconds
        const expires = "expires=" + d.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
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

    // Initialize Leaflet map
    function initializeMap(lat, lng) {
        if (!mapInstance) {
            mapInstance = L.map('map').setView([lat, lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);
        }
        L.marker([lat, lng]).addTo(mapInstance).bindPopup('Your Location').openPopup();
    }

    // Collect data and display in dashboard
    function collectData() {
        const data = [
            `Clicks: ${userSessionData.clicks}`,
            `Mouse Movements: ${userSessionData.mouseMoves}`,
            `Time Spent (seconds): ${userSessionData.timeSpent}`,
            `Referrer: ${userSessionData.referrer}`,
            `Connection Type: ${userSessionData.connectionType}`,
            `Geolocation: ${userSessionData.geolocation || "Loading..."}`,
        ];
        dataCollected.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            dataCollected.appendChild(li);
        });
    }

    // Update dashboard
    function updateDashboard() {
        const consent = getCookie('consent') || 'Pending';
        const buyDrink = getCookie('marketing') === 'enabled' ? 'Yes' : 'No';

        consentStatus.textContent = `Consent: ${consent}`;
        buyDrinkStatus.textContent = `Buy the Devs a Drink: ${buyDrink}`;
        collectData();

        const deviceData = getDeviceData();
        deviceInfoTable.innerHTML = '';
        for (const [key, value] of Object.entries(deviceData)) {
            const row = `<tr><td>${key}</td><td>${value}</td></tr>`;
            deviceInfoTable.innerHTML += row;
        }

        const allCookies = getAllCookies();
        cookieTable.innerHTML = '';
        allCookies.forEach(({ key, value }) => {
            const row = `<tr><td>${key}</td><td>${key === 'analytics' ? 'Analytics' : key === 'marketing' ? 'Marketing' : 'Functional'}</td><td>${value}</td></tr>`;
            cookieTable.innerHTML += row;
        });
    }

    // Accept All Cookies
    document.getElementById('acceptAll').addEventListener('click', () => {
        setCookie('consent', 'all', 1);
        setCookie('analytics', 'enabled', 1);
        setCookie('marketing', 'enabled', 1);
        modal.style.display = 'none';
        updateDashboard();
    });

    // Accept Necessary Cookies
    document.getElementById('acceptNecessary').addEventListener('click', () => {
        setCookie('consent', 'necessary', 1);
        setCookie('analytics', 'disabled', 1);
        setCookie('marketing', 'disabled', 1);
        modal.style.display = 'none';
        updateDashboard();
    });

    // Custom Settings
    document.getElementById('customSettings').addEventListener('click', () => {
        modal.style.display = 'none';
        customModal.style.display = 'block';
    });

    // Save Custom Settings
    document.getElementById('saveCustomSettings').addEventListener('click', () => {
        const analyticsEnabled = document.getElementById('analyticsCookie').checked;
        const marketingEnabled = document.getElementById('marketingCookie').checked;

        setCookie('consent', 'custom', 1);
        setCookie('analytics', analyticsEnabled ? 'enabled' : 'disabled', 1);
        setCookie('marketing', marketingEnabled ? 'enabled' : 'disabled', 1);

        customModal.style.display = 'none';
        updateDashboard();
    });

    // Initialize the dashboard
    updateDashboard();
});











