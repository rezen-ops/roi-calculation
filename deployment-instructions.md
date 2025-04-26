# Klaviyo Reporting Automation ROI Calculator - Deployment Instructions

## Overview
This document provides instructions for deploying the Klaviyo Reporting Automation ROI Calculator web application. The calculator is a simple, client-side application that requires no backend server or database.

## Files Included
- `index.html` - The main HTML file containing the calculator structure
- `css/styles.css` - The CSS file for styling the calculator
- `js/calculator.js` - The JavaScript file containing the calculation logic

## Deployment Options

### Option 1: Standard Web Hosting
1. Upload all files and folders to your web hosting service, maintaining the directory structure
2. Ensure the following structure is preserved:
   ```
   index.html
   css/styles.css
   js/calculator.js
   ```
3. No server-side configuration is required as this is a pure frontend application

### Option 2: Local Deployment
1. Copy all files to a local directory on your computer
2. Open the `index.html` file directly in a web browser

### Option 3: GitHub Pages
1. Create a new GitHub repository
2. Upload all files to the repository, maintaining the directory structure
3. Enable GitHub Pages in the repository settings
4. Select the main branch as the source

## Customization

### Calendly Link
To update the "Book a Call" button link:
1. Open `index.html`
2. Locate the line containing `<a href="https://calendly.com/your-calendar-link"`
3. Replace `your-calendar-link` with your actual Calendly URL

### Brand Colors
To modify the brand colors:
1. Open `css/styles.css`
2. Locate the `:root` section at the top of the file
3. Update the color variables as needed:
   ```css
   --primary-blue: #3b5adb;
   --primary-green: #00c875;
   --text-navy: #1e2c60;
   ```

## Browser Compatibility
The calculator is compatible with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Mobile Responsiveness
The calculator is fully responsive and works on mobile devices and tablets of all sizes.

## Support
For any questions or issues, please contact your developer or support team.
