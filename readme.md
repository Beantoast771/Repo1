# Cookie Consent Demo Project

## **Overview**
This project is a fully functional Cookie Consent demonstration built using **HTML**, **CSS**, and **JavaScript**. It includes an interactive **dashboard** to display live user data collected during a session. The demo showcases how cookie preferences can affect data collection and provides a visual representation of geolocation and device information.

### **Features**
- **Cookie Consent Modal**:
  - Users can accept all, only necessary, or customise their cookie preferences.
- **Custom Settings Modal**:
  - Allows users to toggle analytics and marketing cookies individually.
- **Live Data Dashboard**:
  - Displays:
    - Cookie consent status.
    - User interactions (clicks, mouse movements, time spent).
    - Device information (screen resolution, browser, platform, etc.).
    - Geolocation on a map.
    - All stored cookies.
- **Geolocation Integration**:
  - Shows the user's location on a map using **Leaflet.js**.
- **Clear Cookies Button**:
  - Resets cookies and reloads the page for a fresh session.

---

## **File Structure**

```plaintext
/
|-- index.html         # Main HTML file for the project
|-- style.css          # CSS file for styling
|-- script.js          # JavaScript file for interactivity
|-- README.md          # This documentation file
```

---

## **How It Works**

### 1. **Cookie Consent Modal**
- **Purpose**: Collects user preferences for cookies.
- **Options**:
  1. **Accept All**: Enables all cookies (analytics and marketing).
  2. **Accept Necessary**: Only enables essential cookies.
  3. **Custom Settings**: Opens a second modal where users can customise their cookie preferences.

### 2. **Custom Settings Modal**
- **Options**:
  - Enable/disable **analytics cookies**.
  - Enable/disable **marketing cookies**.
- **Save Settings**: Saves preferences as cookies and closes the modal.

### 3. **Live Data Dashboard**
- Dynamically displays:
  - **Consent Status**: Displays the user's selected cookie preferences.
  - **Collected Data**:
    - Number of clicks.
    - Number of mouse movements.
    - Time spent on the page (in seconds).
    - Referrer URL.
    - Connection type (e.g., Wi-Fi, 4G).
    - Geolocation (latitude, longitude).
  - **Device Information**: Screen resolution, browser details, language, and platform.
  - **All Stored Cookies**: Lists all cookies with their purpose and value.

### 4. **Geolocation Integration**
- Uses the browser's `navigator.geolocation` API to retrieve the user's location.
- Displays the location on a map using **Leaflet.js**.
- If geolocation is denied or unsupported, displays an appropriate message.

### 5. **Clear Cookies Button**
- Clears all cookies by setting their expiration date to the past.
- Reloads the page to reset the session.

---

## **Setup Instructions**

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge).

### Running the Project
1. **Download the Files**:
   - Ensure you have `index.html`, `style.css`, `script.js`, and this `README.md` file.

2. **Open the Project**:
   - Open `index.html` in your browser.

3. **Interacting with the Demo**:
   - On page load, the **Cookie Consent Modal** will appear.
   - Choose one of the three options (Accept All, Accept Necessary, or Custom Settings).
   - Explore the **Live Data Dashboard** to see real-time updates.

4. **Clear Cookies**:
   - Click the **Clear Cookies** button to reset the session and try again.

---

## **Technical Details**

### **JavaScript Overview**

#### **Key Objects and Functions**

1. **`userSessionData`**:
   - Tracks user interactions (clicks, movements, time spent).
   - Stores referrer, connection type, and geolocation.

2. **`setCookie(name, value, hours)`**:
   - Creates a cookie with a name, value, and expiration time.

3. **`getCookie(name)`**:
   - Retrieves a specific cookie by name.

4. **`getAllCookies()`**:
   - Returns all cookies as key-value pairs.

5. **`initializeMap(lat, lng)`**:
   - Initializes a Leaflet map and marks the user's location.

6. **`updateDashboard()`**:
   - Refreshes the dashboard with updated data and cookies.

7. **`clearAllCookies()`**:
   - Deletes all cookies and reloads the page.

### **Libraries Used**
1. **Leaflet.js**:
   - For geolocation mapping.
   - CDN: `https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`.
2. **Browser APIs**:
   - `navigator.geolocation`: For location data.
   - `document.cookie`: For managing cookies.

---

## **Customisation**

### Changing Modal Text
- Modify the text in the **Cookie Consent Modal** (`index.html`):
  ```html
  <p>We use cookies to improve your experience. Please select your preferences:</p>
  ```

### Adjusting Cookie Expiration
- Update the expiration time in `setCookie()` (in `script.js`):
  ```javascript
  d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
  ```
  - Example: Change `hours` to a different value.

### Styling
- Modify the styles in `style.css` to match your design preferences.

---

## **Limitations**
- **No Backend Integration**:
  - This project is entirely client-side and does not store data on a server.
- **Data Persistence**:
  - Data is only stored in cookies for the session duration.

---

## **Future Enhancements**
- Add a server-side backend to store and analyse data.
- Include additional cookie categories.
- Enhance the UI with animations or themes.

---

## **Licence**
This project is licensed under the MIT Licence.

---

Enjoy exploring the Cookie Consent Demo Project! 😊

