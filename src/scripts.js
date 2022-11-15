//  IMPORTS LIVE HERE
import './css/styles.css';
import './images/turing-logo.png';
import './images/overlook-logo.png';
import './images/junior suite.png';
import './images/residential suite.png';
import './images/suite.png';
import './images/single room.png';
import './images/lodge.png';
import Customer from './customer-class.js';
import { fetchData, postBooking } from './apiCalls.js';
import Room from './room-class';

//  QUERYSELECTORS LIVE HERE
let bookRoomButton = document.querySelector('#button--book-room');
let loginButton = document.querySelector('#button--login')
let myBookingsButton = document.querySelector('#button--my-bookings');
let confirmationButtons = document.querySelector('#container--confirmation-buttons');
let loginPage = document.querySelector('#container--login');
let errorBookingMessage = document.querySelector('#error--booking-message');
let dateInput = document.querySelector('#input--date');
let roomTypeInput = document.querySelector('#input--roomType');
let usernameInput = document.querySelector('#input--username');
let passwordInput = document.querySelector('#input--password');
let bookingsNav = document.querySelector('#nav--bookings');
let welcomeMessage = document.querySelector('#p--welcome');
let popUpBox = document.querySelector('#popUpBox');
let bookRoomSection = document.querySelector('#section--book-room');
let bookingsSection = document.querySelector('#section--display-bookings');
let myBookingsSection = document.querySelector('#section--my-bookings');
let roomsTableBody = document.querySelector('#table--rooms-body');
let apology = document.querySelector('#text--apology');
let fetchFail = document.querySelector('#text--fetch-fail');
let loginError = document.querySelector('#text--login-error');
let popUpText =document.querySelector('#text--popUp');
let totalRooms = document.querySelector('#text--total-rooms');
let totalSpent = document.querySelector('#text--total-spent');
let bookingsTitle = document.querySelector('#title--bookings');
let body = document.querySelector('body');

// GLOBAL VARIABLES LIVE HERE
let customer, roomData, allRooms, allBookings, date, desiredRoom, roomTypeFilter, allCustomers;


//  PROMISES LIVE HERE
let promises = () => {
    Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
    .then(data => {
        allCustomers = data[2].customers.map(customer => 'customer' + customer.id);
        allBookings = data[1].bookings;
        roomData = data[0].rooms;
    })
}

let customerLoginPromise = (id) => {
    Promise.all([fetchData(`customers/${id}`)])
        .then(data => {
            createAndWelcomeCustomer(data[0], allBookings);
            updateRooms(allBookings)
            displayUserBookings(customer.bookings, 'all');
            hide(loginPage);
            show(bookRoomButton);
            show(myBookingsSection);
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
    navigateToBookARoom();
})

confirmationButtons.addEventListener('click', (event) => {
    confirmOrCancelBooking(event);
})

dateInput.addEventListener('input', (event) => {
    respondToDateInput(event);
})

loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    validateCredentials();
})

myBookingsButton.addEventListener('click', () => {
    navigateToMyBookings();
})

roomsTableBody.addEventListener('click' , (event) => {
    displayBookingConfirmation(event);
})

roomTypeInput.addEventListener('input', (event) => {
    respondToRoomTypeInput(event);
})

// HELPER FUNCTIONS LIVE HERE
let show = (element) => {
    element.classList.remove('hidden');
}

let hide = (element) => {
    element.classList.add('hidden')
}

let checkDate = (date) => {
    let todaysDate = getTodaysDate();
    if (date < todaysDate) {
        show(errorBookingMessage);
        errorBookingMessage.innerText = `Please select a date no earlier than ${todaysDate}`;
        return 'invalid date';
    } 
}

let confirmOrCancelBooking = (event) => {
    if (event.target.id === 'button--confirm') {
        let bookingInfo = { userID: customer.id, roomNumber: desiredRoom.number, date: date}
        bookRoomPromise(bookingInfo);
        resetPopUpFocus();
    } else if (event.target.id === 'button--no') {
        hide(popUpBox);
        resetPopUpFocus();
    }
}

let createAndWelcomeCustomer = (userData, bookings) => {
    customer = new Customer(userData);
    customer.retrieveAllBookings(bookings);
    updateWelcome();
}

let displayAvailableRooms = (availableRooms) => {
    roomsTableBody.innerHTML = '';
    availableRooms.forEach(room => {
        roomsTableBody.innerHTML += `<tr tabindex=0>
        <td aria-label="room number ${room.number}">${room.number}</td>
        <td><img class="image--book-room" src="./images/${room.roomType}.png" alt="${room.roomType}"></td>
        <td aria-label="room type ${room.roomType}">${room.roomType}</td>
        <td aria-label="bidet ${room.bidet}">${room.bidet}</td>
        <td aria-label="bed size ${room.bedSize}">${room.bedSize}</td>
        <td aria-label="number of beds ${room.numBeds}">${room.numBeds}</td>
        <td aria-label="cost per night $${room.costPerNight}">$${room.costPerNight}</td>
        <td><a href="#" id="link--book-now-room-${room.number}" data-room="${room.number}" role="link">Book Now!</a><td>
        </tr>`
    })
}

let displayBookingConfirmation = (event) => {
    if (event.target.dataset.room) {
        desiredRoom = allRooms.find(room => room.number.toString() === event.target.dataset.room);
    } else {
        return;
    }
    show(popUpBox);
    body.style = "overflow: hidden"
    popUpText.innerHTML = `Are you sure you would like to book the ${desiredRoom.roomType} on ${date} for $${desiredRoom.costPerNight}?`;
    focusOnPopUp();
}

let displayUserBookings = (bookings, type) => {
    bookingsTitle.innerText = `${type.toUpperCase()} BOOKINGS`
    bookings.forEach(booking => {
        let roomInfo = booking.retrieveRoomInfo(allRooms);
        bookingsSection.innerHTML += 
        `<div class="card--booking" tabindex=0>
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

let focusOnPopUp = () => {
    let nonFocusable = bookRoomSection.querySelectorAll('*:not(#popUpBox, #text--popUp, #container--confirmation-buttons, #button--confirm, #button--no)');
    nonFocusable.forEach(node => node.setAttribute("aria-disabled", true));
    nonFocusable.forEach(node => node.setAttribute("tabindex", -1));
}

let getTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    return today;
}

let navigateToBookARoom = () => {
    hide(myBookingsSection);
    dateInput.value = '';
    date = '';
    roomTypeInput.value = '';
    roomTypeFilter = '';
    displayAvailableRooms([]);
    show(bookRoomSection);
    hide(bookRoomButton);
    show(myBookingsButton);
}

let navigateToMyBookings = () => {
    hide(apology);
    show(myBookingsSection);
    hide(bookRoomSection);
    show(bookRoomButton);
    hide(myBookingsButton);
    let bookings = retrieveUserBookingsForDisplay('all');
    displayUserBookings(bookings, 'all');
}

let resetPopUpFocus = () => {
    let nonFocusable = bookRoomSection.querySelectorAll('*:not(#popUpBox, #text--popUp, #container--confirmation-buttons, #button--confirm, #button--no)');
    nonFocusable.forEach(node => node.removeAttribute("aria-hidden"));
    nonFocusable.forEach(node => node.removeAttribute("aria-disabled"));
    nonFocusable.forEach(node => node.removeAttribute("tabindex"));
    body.style = "overflow: visible"
}

let respondToDateInput = (event) => {
    date = event.target.value;
    date = date.replace(/[-]/g, '/');
    if (checkDate(date) === 'invalid date') {
        roomsTableBody.innerHTML = ''
        return;
    };
    hide(errorBookingMessage);
    let availableRooms = retrieveAvailableRooms(date, roomTypeFilter);
    (availableRooms.length !== 0) ? hide(apology) : show(apology);
    displayAvailableRooms(availableRooms);
}

let respondToRoomTypeInput = (event) => {
    roomTypeFilter = event.target.value;
    hide(errorBookingMessage);
    let availableRooms = retrieveAvailableRooms(date, roomTypeFilter);
    (availableRooms.length !== 0) ? hide(apology) : show(apology);
    displayAvailableRooms(availableRooms);
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
            if (!room.checkIfBooked(date)) {
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

let validateCredentials = () => {
    if (allCustomers.includes(usernameInput.value) && passwordInput.value === 'overlook2021') {
        let ids = [];
        usernameInput.value.split('').forEach((letter, index) => {
            if (index > 7) {
                return ids.push(letter);
            }
        });
        let id = ids.join('');
        customerLoginPromise(id);
    } else {
        loginError.innerText = "Credentials not found. Please try again."
    }
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

window.addEventListener('onload', promises())

export { fetchFail, show, hide };

