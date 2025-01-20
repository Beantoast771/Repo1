// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Get references to key DOM elements
    const modal = document.getElementById('cookieModal'); // Cookie consent modal
    const customModal = document.getElementById('customModal'); // Custom settings modal
    const consentStatus = document.getElementById('consentStatus'); // Consent status display
    const buyDrinkStatus = document.getElementById('buyDrinkStatus'); // "Buy the Devs a Drink" status
    const deviceInfoTable = document.getElementById('deviceInfoTable'); // Table for device data
    const cookieTable = document.getElementById('cookieTable'); // Table for stored cookies
    const dataCollected = document.getElementById('dataCollected'); // List for collected data (clicks, movements, etc.)

    // Object to track user activity
    const userSessionData = {
        clicks: 0, // Number of clicks
        mouseMoves: 0, // Number of mouse movements
        timeSpent: 0, // Time spent on the page (in seconds)
        geolocation: null, // User's geolocation (latitude and longitude)
        referrer: document.referrer || "Direct Access", // Referrer URL or "Direct Access"
        connectionType: navigator.connection ? navigator.connection.effectiveType : "Unknown", // Connection type (e.g., Wi-Fi, 4G)
    };

    let mapInstance = null; // Variable to store the Leaflet map instance

    // Show the cookie consent modal on page load
    modal.style.display = 'block';

    // Track clicks on the page
    document.addEventListener('click', () => {
        userSessionData.clicks += 1; // Increment the click count
    });

    // Track mouse movements
    document.addEventListener('mousemove', () => {
        userSessionData.mouseMoves += 1; // Increment the mouse movement count
    });

    // Track time spent on the page (updates every second)
    setInterval(() => {
        userSessionData.timeSpent += 1;
    }, 1000);

    // Periodically update the dashboard every 10 seconds
    setInterval(() => {
        collectData(); // Update collected data
        updateDashboard(); // Refresh dashboard
    }, 10000);

    // Try to get the user's geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // If successful, store latitude and longitude
                userSessionData.geolocation = `${position.coords.latitude}, ${position.coords.longitude}`;
                initializeMap(position.coords.latitude, position.coords.longitude); // Show location on map
                updateDashboard(); // Refresh dashboard
            },
            (error) => {
                userSessionData.geolocation = "Permission Denied"; // Handle denied permission
                updateDashboard();
            }
        );
    } else {
        userSessionData.geolocation = "Not Supported"; // Geolocation not supported
    }

    // Function to set a cookie with a name, value, and expiry time in hours
    function setCookie(name, value, hours) {
        const d = new Date();
        d.setTime(d.getTime() + (hours * 60 * 60 * 1000)); // Convert hours to milliseconds
        const expires = "expires=" + d.toUTCString(); // Format expiration date
        document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`; // Set cookie
    }

    // Function to retrieve a specific cookie by name
    function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';'); // Split all cookies into an array
        for (let cookie of cookies) {
            cookie = cookie.trim(); // Remove leading spaces
            if (cookie.startsWith(nameEQ)) {
                return cookie.substring(nameEQ.length); // Return the cookie value
            }
        }
        return null; // Return null if not found
    }

    // Function to get all cookies as key-value pairs
    function getAllCookies() {
        const cookies = document.cookie.split(';'); // Split cookies
        const cookieData = [];
        for (let cookie of cookies) {
            const [key, value] = cookie.trim().split('='); // Split each cookie into key and value
            if (key && value !== undefined) {
                cookieData.push({ key, value });
            }
        }
        return cookieData;
    }

    // Function to get device information
    function getDeviceData() {
        return {
            ScreenWidth: window.screen.width, // Screen width in pixels
            ScreenHeight: window.screen.height, // Screen height in pixels
            Browser: navigator.userAgent, // User agent string (browser and OS details)
            Language: navigator.language, // Preferred language of the browser
            Platform: navigator.platform, // Platform (e.g., Windows, Mac)
        };
    }

    // Function to initialize the Leaflet map
    function initializeMap(lat, lng) {
        if (!mapInstance) {
            mapInstance = L.map('map').setView([lat, lng], 13); // Set initial map view
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);
        }
        // Add a marker at the user's location
        L.marker([lat, lng]).addTo(mapInstance).bindPopup('Your Location').openPopup();
    }

    // Function to collect and display user activity data
    function collectData() {
        const data = [
            `Clicks: ${userSessionData.clicks}`, // Number of clicks
            `Mouse Movements: ${userSessionData.mouseMoves}`, // Number of mouse movements
            `Time Spent (seconds): ${userSessionData.timeSpent}`, // Time spent on page
            `Referrer: ${userSessionData.referrer}`, // Referrer URL
            `Connection Type: ${userSessionData.connectionType}`, // Connection type
            `Geolocation: ${userSessionData.geolocation || "Loading..."}`, // Geolocation or loading message
        ];
        // Populate the list with collected data
        dataCollected.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            dataCollected.appendChild(li);
        });
    }

    // Function to update the dashboard with all data
    function updateDashboard() {
        const consent = getCookie('consent') || 'Pending'; // Get consent status
        const buyDrink = getCookie('marketing') === 'enabled' ? 'Yes' : 'No'; // Get marketing status

        // Update the consent and "Buy the Devs a Drink" status
        consentStatus.textContent = `Consent: ${consent}`;
        buyDrinkStatus.textContent = `Buy the Devs a Drink: ${buyDrink}`;
        collectData();

        // Display device information in a table
        const deviceData = getDeviceData();
        deviceInfoTable.innerHTML = '';
        for (const [key, value] of Object.entries(deviceData)) {
            const row = `<tr><td>${key}</td><td>${value}</td></tr>`;
            deviceInfoTable.innerHTML += row;
        }

        // Display all cookies in a table
        const allCookies = getAllCookies();
        cookieTable.innerHTML = '';
        allCookies.forEach(({ key, value }) => {
            const row = `<tr><td>${key}</td><td>${key === 'analytics' ? 'Analytics' : key === 'marketing' ? 'Marketing' : 'Functional'}</td><td>${value}</td></tr>`;
            cookieTable.innerHTML += row;
        });
    }

    // Function to clear all cookies and refresh the page
    function clearAllCookies() {
        const cookies = document.cookie.split(';'); // Split all cookies
        cookies.forEach(cookie => {
            const name = cookie.split('=')[0].trim(); // Extract cookie name
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Expire the cookie
        });
        alert('All cookies have been cleared. Refreshing the page...'); // Notify the user
        location.reload(); // Refresh the page
    }

    // Event listener for "Accept All" button
    document.getElementById('acceptAll').addEventListener('click', () => {
        setCookie('consent', 'all', 1);
        setCookie('analytics', 'enabled', 1);
        setCookie('marketing', 'enabled', 1);
        modal.style.display = 'none';
        updateDashboard();
    });

    // Event listener for "Accept Necessary" button
    document.getElementById('acceptNecessary').addEventListener('click', () => {
        setCookie('consent', 'necessary', 1);
        setCookie('analytics', 'disabled', 1);
        setCookie('marketing', 'disabled', 1);
        modal.style.display = 'none';
        updateDashboard();
    });

    // Event listener for "Custom Settings" button
    document.getElementById('customSettings').addEventListener('click', () => {
        modal.style.display = 'none';
        customModal.style.display = 'block';
    });

    // Event listener for "Save Custom Settings" button
    document.getElementById('saveCustomSettings').addEventListener('click', () => {
        const analyticsEnabled = document.getElementById('analyticsCookie').checked;
        const marketingEnabled = document.getElementById('marketingCookie').checked;

        setCookie('consent', 'custom', 1);
        setCookie('analytics', analyticsEnabled ? 'enabled' : 'disabled', 1);
        setCookie('marketing', marketingEnabled ? 'enabled' : 'disabled', 1);

        customModal.style.display = 'none';
        updateDashboard();
    });

    // Event listener for "Clear Cookies" button
    document.getElementById('clearCookies').addEventListener('click', clearAllCookies);

    // Initialize the dashboard on page load
    updateDashboard();
});













