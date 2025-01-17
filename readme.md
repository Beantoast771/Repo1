
# Cookie Consent Demo Project

This project demonstrates a simple cookie consent mechanism and a live dashboard for displaying user consent and device information. It is designed to work entirely client-side, making it perfect for local demos without requiring a server or domain.

## Features

- **Cookie Consent Modal**: A popup that allows users to choose their cookie preferences: 
  - Accept All
  - Accept Necessary
  - Custom Settings
- **Live Data Dashboard**: Displays:
  - User consent status (e.g., all, necessary, custom)
  - Mock "Buy the Devs a Drink" consent
  - Device information (e.g., browser and operating system)
- **Serverless Implementation**: Fully functional without the need for hosting or server-side processing.

## Usage

1. **Download and Open Locally**:
   - Save the `index.html` file on your computer.
   - Double-click the file to open it in your browser.

2. **Interact with the Consent Modal**:
   - On page load, a cookie consent modal will appear.
   - Choose one of the following options:
     - **Accept All**: Grants full consent, including the fun "Buy the Devs a Drink" option.
     - **Accept Necessary**: Only accepts essential cookies.
     - **Custom Settings**: Accepts customised consent and also grants the "Buy the Devs a Drink" option.

3. **View the Dashboard**:
   - After selecting an option, the modal disappears, and the live dashboard updates to display:
     - Consent status
     - "Buy the Devs a Drink" status
     - Device information (e.g., user agent).

## Files

- **index.html**: The main file containing the cookie modal and dashboard functionality.
- **README.md**: This documentation file.

## How It Works

- **Consent Storage**: 
  - User preferences are saved in `localStorage` for a serverless experience.
- **Device Data Collection**:
  - Device information is collected using the browser's `navigator.userAgent` API.
- **Real-Time Dashboard**:
  - Displays data dynamically on the webpage based on user input.

## Customisation

You can modify the modal text, button labels, or dashboard content directly in the `index.html` file to suit your requirements.

## Limitations

- This project is designed for demo purposes and is not intended for production use.
- Data persistence is limited to the browser's `localStorage` and will not work across devices.

## Licence

This project is released under the MIT Licence.

---

**Enjoy demonstrating cookie consent and having some fun with "Buy the Devs a Drink"!**
