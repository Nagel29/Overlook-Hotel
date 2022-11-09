//  IMPORTS LIVE HERE
import './css/styles.css';
import './images/turing-logo.png';
import './images/overlook-logo.png';
import './images/junior-suite.png';
import './images/residential-suite.png';
import './images/suite.png';
import './images/single-room.png';
import Customer from './customer-class';
import customerData from './test-data/customer-data.js';
import bookingData from './test-data/booking-data.js';
import roomData from './test-data/room-data.js';

//  QUERYSELECTORS LIVE HERE
let bookingsSection = document.querySelector('.section--display-bookings');
let bookingsNav = document.querySelector('.nav--bookings');

// GLOBAL VARIABLES LIVE HERE
let customer = new Customer(customerData);
customer.retrieveAllBookings(bookingData);

//  PROMISES LIVE HERE

//  EVENT LISTENERS LIVE HERE
bookingsNav.addEventListener('click', (event) => {
    displayBookings(event.target.dataset.cat);
})

// HELPER FUNCTIONS LIVE HERE
let displayBookings = (type) => {
    bookingsSection.innerHTML = ''
    let bookings;
    if (type === 'all') {
        bookings = customer.bookings;
    } else if (type === 'future') {
        bookings = customer.retrieveFutureBookings();
    } else if (type === 'past') {
        bookings = customer.retrievePastBookings();
    }
    bookings.forEach(booking => {
        console.log(booking)
        bookingsSection.innerHTML += `<div class="card--booking">
        <ul>
          <li>Date: ${booking.date}</li>
          <li>Room Number: ${booking.roomNumber}</li>
          <li>Room Type: Presidential Suite</li>
          <li>Bed Size: King</li>
          <li>Number of Beds: 2</li>
          <li>Cost per Night: $366.78</li>
        </ul>
        <img class="image--room" src="./images/junior-suite.png">
      </div>`
    })
    

}