class Customer {
    constructor(customerInfo) {
        this.id = customerInfo.id;
        this.name = customerInfo.name;
    }

    retrieveAllBookings(allBookings) {
        return allBookings.filter(booking => booking.userID === this.id);
    }

    retrieveFutureBookings(bookings) {
        return bookings.filter(booking => {
            let date = new Date(booking.date);
            return date.getTime() >= Date.now();
        });
    }

    retrievePastBookings(bookings) {
        return bookings.filter(booking => {
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