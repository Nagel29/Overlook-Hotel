# Overlook Hotel
## Abstract:
This application is the final project for Mod 2 (4 Mods total) of Turing School of Software and Design. It simulates a hotel's site which allows the user to log in, view past/future bookings, and book new rooms. All of the relevant data such as customers, rooms, and bookings are fetched from an API. Once a new booking takes place, it is posted to the API and the updated data is fetched back.

![](/src/images/app-gif.gif)

## Installation Instructions:
1. Go to [this repo](https://github.com/Nagel29/Overlook-Hotel) on Github
2. Click Fork > Create New Fork
3. Click Code
4. Copy the SSH url provided by GitHub
5. In the terminal, navigate to the new project repository
6. Type git clone and paste the URL
7. Run `npm install`. Note: Do not run `npm audit fix --force`. This will update to the latest version of packages, which are not wanted 
8. Run `npm start` to start the program. (`Ctrl + C` will stop it.)
9. In a browser window, navigate to `http://localhost:8080/`.
10. IMPORTANT: This application uses data from a local server that you must run seperately. Please follow the instructions in this repo to get that server running: https://github.com/turingschool-examples/overlook-api
11. Now you can log in as the various customers by entering Username and Password
    * Username can be 'customer' with any number from 1-50 at the end. For example, 'customer20'
    * Password is 'overlook2021'

## Context:
This was a solo project which took roughly 40-45 hours to complete the application's functionality and test suite from scratch using JavaScript, HTML, and CSS. The Mocha framework and Chai library were used for testing.

## Contributors:
- [Ryan Nagel](https://github.com/Nagel29)

## Learning Goals:
- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Create a robust test suite that thoroughly tests all functionality of a client-side application

## Tech Used:
- GitHub
- Terminal
- VS Code
- Chrome Browser/Dev tools
- JavaScript
- HTML
- CSS
- Mocha
- Chai
- Webpack

## Wins and Challenges
Wins
- This was my first time using both GET and POST to send and retrieve data and I was able to effectively accomplish this in an asynchronous manner.

- This project combined everything I have learned up to this point: OOP, APIs, Testing, Accessibility, and more. I was able to leverage all of these concepts and successfully complete the application.

Challenges
- Starting from scratch can be a little overwhelming at first, but was also nice to start with a blank slate that you can approach in whichever way you'd like. It was valuable, but challenging to develop that approach/plan.

- Understanding which classes I needed to create, and what methods those classes should have, required much thought. I believe I ended up approaching it in a fairly effective manner.


