//  IMPORTS LIVE HERE
import './css/styles.css';
import './images/turing-logo.png';
import './images/overlook-logo.png';
import './images/junior suite.png';
import './images/residential suite.png';
import './images/suite.png';
import './images/single room.png';
import Customer from './customer-class';
import customerData from './test-data/customer-data.js';
import bookingData from './test-data/booking-data.js';
import roomData from './test-data/room-data.js';
import Booking from './booking-class';

//  QUERYSELECTORS LIVE HERE
let bookingsSection = document.querySelector('.section--display-bookings');
let bookingsNav = document.querySelector('#nav--bookings');
let totalSpent = document.querySelector('#text--total-spent');
let bookingsTitle = document.querySelector('#title--bookings');

// GLOBAL VARIABLES LIVE HERE
let customer = new Customer(customerData);
customer.retrieveAllBookings(bookingData);

//  PROMISES LIVE HERE

//  EVENT LISTENERS LIVE HERE
bookingsNav.addEventListener('click', (event) => {
    let bookings = retrieveBookingsForDisplay(event.target.dataset.cat);
    displayBookings(bookings, event.target.dataset.cat);
})

// HELPER FUNCTIONS LIVE HERE
let retrieveBookingsForDisplay = (type) => {
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

let displayBookings = (bookings, type) => {
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


    

