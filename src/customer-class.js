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

         this.bookings.sort((a, b) => {
            if (a.date > b.date) {
                return -1;
            } else {
                return 1;
            };
        });
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

        let total = Number(totalCost.toFixed(2));
        return total.toLocaleString("en-US")
    }
}

export default Customer