//  IMPORTS LIVE HERE
import './css/styles.css';
import './images/turing-logo.png';
import './images/overlook-logo.png';
import './images/junior suite.png';
import './images/residential suite.png';
import './images/suite.png';
import './images/single room.png';
import Customer from './customer-class.js';
import customerData from './test-data/customer-data.js';
import bookingData from './test-data/booking-data.js';
// import roomData from './test-data/room-data.js';
import Booking from './booking-class.js';
import fetchData from './apiCalls.js';
import Room from './room-class';

//  QUERYSELECTORS LIVE HERE
let bookRoomButton = document.querySelector('#button--book-room');
let myBookingsButton = document.querySelector('#button--my-bookings');
let bookRoomSection = document.querySelector('#section--book-room');
let bookingsSection = document.querySelector('#section--display-bookings');
let myBookingsSection = document.querySelector('#section--my-bookings')
let bookingsNav = document.querySelector('#nav--bookings');
let totalSpent = document.querySelector('#text--total-spent');
let bookingsTitle = document.querySelector('#title--bookings');
let welcomeMessage = document.querySelector('#p--welcome');

// GLOBAL VARIABLES LIVE HERE
let customer, roomData, allRooms;


//  PROMISES LIVE HERE
let promises = () => {
    Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers/6')])
    .then(data => {
        createAndWelcomeCustomer(data[2], data[1].bookings);
        roomData = data[0].rooms;
        displayUserBookings(customer.bookings, 'all');
        updateRooms(data[1].bookings)
    });
}


//  EVENT LISTENERS LIVE HERE
bookingsNav.addEventListener('click', (event) => {
    if (event.target.dataset.cat) {
        let bookings = retrieveUserBookingsForDisplay(event.target.dataset.cat);
        displayUserBookings(bookings, event.target.dataset.cat);
    }
})

bookRoomButton.addEventListener('click', () => {
    hide(myBookingsSection);
    show(bookRoomSection);
    hide(bookRoomButton);
    show(myBookingsButton);
})

myBookingsButton.addEventListener('click', () => {
    show(myBookingsSection);
    hide(bookRoomSection);
    show(bookRoomButton);
    hide(myBookingsButton);
    let bookings = retrieveUserBookingsForDisplay('all');
    displayUserBookings(bookings, 'all');
})

// HELPER FUNCTIONS LIVE HERE
let show = (element) => {
    element.classList.remove('hidden');
}

let hide = (element) => {
    element.classList.add('hidden')
}

let createAndWelcomeCustomer = (userData, bookings) => {
    customer = new Customer(userData);
    customer.retrieveAllBookings(bookings);
    updateWelcome();
}

let updateRooms = (bookings) => {
    allRooms = [];
    roomData.forEach(room => {
        let roomInstance = new Room(room);
        roomInstance.retrieveBookings(bookings);
        allRooms.push(roomInstance);
    });
}

let updateWelcome = () => {
    welcomeMessage.innerText = `Welcome, ${customer.name}!`;
}

let retrieveUserBookingsForDisplay = (type) => {
    bookingsSection.innerHTML = ''
    let bookings;
    if (type === 'all') {
        bookings = customer.bookings;
    } else if (type === 'future') {
        bookings = customer.retrieveFutureBookings();
    } else if (type === 'past') {
        bookings = customer.retrievePastBookings();
    }
    return bookings;
}

let displayUserBookings = (bookings, type) => {
    bookingsTitle.innerText = `${type.toUpperCase()} BOOKINGS`
    bookings.forEach(booking => {
        let roomInfo = booking.retrieveRoomInfo();
        bookingsSection.innerHTML += 
        `<div class="card--booking">
            <ul>
            <li>Date: ${booking.date}</li>
            <li>Room Number: ${booking.roomNumber}</li>
            <li>Room Type: ${roomInfo.roomType}</li>
            <li>Bed Size: ${roomInfo.bedSize}</li>
            <li>Number of Beds: ${roomInfo.numBeds}</li>
            <li>Cost per Night: ${roomInfo.costPerNight}</li>
            </ul>
            <img class="image--room" src="./images/${roomInfo.roomType}.png" alt="${roomInfo.roomType}">
        </div>`
    })
    totalSpent.innerText = `Total spent on ${type} rooms: $${customer.calculateTotalSpent(bookings, roomData)}`;
}

window.addEventListener('load', promises())

    

