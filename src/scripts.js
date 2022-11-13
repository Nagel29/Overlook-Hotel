//  IMPORTS LIVE HERE
import './css/styles.css';
import './images/turing-logo.png';
import './images/overlook-logo.png';
import './images/junior suite.png';
import './images/residential suite.png';
import './images/suite.png';
import './images/single room.png';
import Customer from './customer-class.js';
// import customerData from './test-data/customer-data.js';
// import bookingData from './test-data/booking-data.js';
// import roomData from './test-data/room-data.js';
// import Booking from './booking-class.js';
import { fetchData, postBooking } from './apiCalls.js';
import Room from './room-class';

//  QUERYSELECTORS LIVE HERE
let bookRoomButton = document.querySelector('#button--book-room');
let myBookingsButton = document.querySelector('#button--my-bookings');
let confirmationButtons = document.querySelector('#container--confirmation-buttons');
let errorBookingMessage = document.querySelector('#error--booking-message');
let dateInput = document.querySelector('#input--date');
let roomTypeInput = document.querySelector('#input--roomType');
let bookingsNav = document.querySelector('#nav--bookings');
let welcomeMessage = document.querySelector('#p--welcome');
let popUpBox = document.querySelector('#popUpBox');
let bookRoomSection = document.querySelector('#section--book-room');
let bookingsSection = document.querySelector('#section--display-bookings');
let myBookingsSection = document.querySelector('#section--my-bookings');
let roomsTableBody = document.querySelector('#table--rooms-body');
let apology = document.querySelector('#text--apology');
let fetchFail = document.querySelector('#text--fetch-fail');
let popUpText =document.querySelector('#text--popUp');
let totalRooms = document.querySelector('#text--total-rooms');
let totalSpent = document.querySelector('#text--total-spent');
let bookingsTitle = document.querySelector('#title--bookings');

let body = document.querySelector('body')


// GLOBAL VARIABLES LIVE HERE
let customer, roomData, allRooms, allBookings, date, desiredRoom, roomTypeFilter;


//  PROMISES LIVE HERE
let promises = () => {
    Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers/1')])
    .then(data => {
        allBookings = data[1].bookings;
        createAndWelcomeCustomer(data[2], allBookings);
        roomData = data[0].rooms;
        updateRooms(allBookings)
        displayUserBookings(customer.bookings, 'all');
    })
}

let bookRoomPromise = (bookingInfo) => {
    Promise.all([postBooking(bookingInfo)])
    .then(data => fetchData('bookings'))
    .then(data => {
        allBookings = data.bookings;
        updateRooms(allBookings);
        customer.retrieveAllBookings(allBookings);
        show(myBookingsSection);
        hide(bookRoomSection);
        show(bookRoomButton);
        hide(myBookingsButton);
        hide(popUpBox);
        displayUserBookings(retrieveUserBookingsForDisplay('future'), 'future');
    })
    
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
    dateInput.value = '';
    roomTypeInput.value = '';
    displayAvailableRooms([]);
    show(bookRoomSection);
    hide(bookRoomButton);
    show(myBookingsButton);
})

confirmationButtons.addEventListener('click', (event) => {
    if (event.target.id === 'button--confirm') {
        let bookingInfo = { userID: customer.id, roomNumber: desiredRoom.number, date: date}
        bookRoomPromise(bookingInfo);
        body.style = "overflow: visible"
    } else if (event.target.id === 'button--no') {
        body.style = "overflow: visible"
        hide(popUpBox);
    }
})

dateInput.addEventListener('input', (event) => {
    date = event.target.value;
    date = date.replace(/[-]/g, '/');
    if (checkDate(date) === 'invalid date') {
        roomsTableBody.innerHTML = ''
        return;
    };
    let availableRooms = retrieveAvailableRooms(date, roomTypeFilter);
    hide(errorBookingMessage);
    (availableRooms.length !== 0) ? hide(apology) : show(apology);
    displayAvailableRooms(availableRooms);
})

myBookingsButton.addEventListener('click', () => {
    hide(apology);
    show(myBookingsSection);
    hide(bookRoomSection);
    show(bookRoomButton);
    hide(myBookingsButton);
    let bookings = retrieveUserBookingsForDisplay('all');
    displayUserBookings(bookings, 'all');
})

roomsTableBody.addEventListener('click' , (event) => {
    if (event.target.dataset.room) {
        desiredRoom = allRooms.find(room => room.number.toString() === event.target.dataset.room);
        displayBookingConfirmation(desiredRoom);
    }
})

roomTypeInput.addEventListener('input', (event) => {
    roomTypeFilter = event.target.value;
    let availableRooms = retrieveAvailableRooms(date, roomTypeFilter);
    hide(errorBookingMessage);
    (availableRooms.length !== 0) ? hide(apology) : show(apology);
    displayAvailableRooms(availableRooms);
})

// HELPER FUNCTIONS LIVE HERE
let show = (element) => {
    element.classList.remove('hidden');
}

let hide = (element) => {
    element.classList.add('hidden')
}

let getTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    return today;
}

let checkDate = (date) => {
    let todaysDate = getTodaysDate();
    if (date < todaysDate) {
        show(errorBookingMessage);
        errorBookingMessage.innerText = `Please select a date no earlier than ${todaysDate}`;
        return 'invalid date';
    } 
}

let createAndWelcomeCustomer = (userData, bookings) => {
    customer = new Customer(userData);
    customer.retrieveAllBookings(bookings);
    updateWelcome();
}

let displayBookingConfirmation = (desiredRoom) => {
    show(popUpBox);
    body.style = "overflow: hidden"
    popUpText.innerHTML = `Are you sure you would like to book the ${desiredRoom.roomType} for $${desiredRoom.costPerNight}?`
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

let retrieveAvailableRooms = (date, roomType) => {
    let availableRoomsByType, rooms;
    if (roomType) {
        availableRoomsByType = allRooms.filter(room => room.roomType === roomType);
        rooms = availableRoomsByType;
    } else {
        rooms = allRooms;
    }
    if (date) {
        let availableRooms = rooms.reduce((acc, room) => {
            let booked = false;
            room.bookings.forEach(booking => {
                if (booking.date === date) {
                    booked = true;
                }
            })
            if (booked === false) {
                acc.push(room);
            }
            return acc;
        }, []);
        return availableRooms;
    }
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

let displayAvailableRooms = (availableRooms) => {
    roomsTableBody.innerHTML = '';
    availableRooms.forEach(room => {
        roomsTableBody.innerHTML += `<tr>
        <td>${room.number}</td>
        <td><img class="image--book-room" src="./images/${room.roomType}.png"></td>
        <td>${room.roomType}</td>
        <td>${room.bidet}</td>
        <td>${room.bedSize}</td>
        <td>${room.numBeds}</td>
        <td>${room.costPerNight}</td>
        <td><a href="#" data-room="${room.number}">Book Now!</a><td>
        </tr>`
    })
}

let displayUserBookings = (bookings, type) => {
    bookingsTitle.innerText = `${type.toUpperCase()} BOOKINGS`
    bookings.forEach(booking => {
        let roomInfo = booking.retrieveRoomInfo(allRooms);
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
    });
    totalRooms.innerText = `Total number of ${type} rooms booked: ${bookings.length}`;
    totalSpent.innerText = `Total spent on ${type} rooms: $${customer.calculateTotalSpent(bookings, roomData)}`;
}

window.addEventListener('load', promises())

export { fetchFail, show, hide };

