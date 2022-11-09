import Booking from './booking-class.js';

class Customer {
    constructor(customerInfo) {
        this.id = customerInfo.id;
        this.name = customerInfo.name;
    }

    retrieveAllBookings(allBookings) {
        this.bookings = [];
        let userBookings = allBookings.filter(booking => booking.userID === this.id);
        userBookings.forEach(booking => {
            this.bookings.push(new Booking(booking))
        })
    }

    retrieveFutureBookings() {
        return this.bookings.filter(booking => {
            let date = new Date(booking.date);
            return date.getTime() >= Date.now();
        });
    }

    retrievePastBookings() {
        return this.bookings.filter(booking => {
            let date = new Date(booking.date);
            return date.getTime() < Date.now();
        });
    }

    calculateTotalSpent(bookings, allRooms) {
        let totalCost = bookings.reduce((acc, booking) => {
            allRooms.forEach(room => {
                if (room.number === booking.roomNumber) {
                    acc += room.costPerNight;
                }
            })
            return acc;
        }, 0)

        return Number(totalCost.toFixed(2));
    }
}

export default Customer