class Room {
    constructor(roomInfo) {
        this.number = roomInfo.number;
        this.roomType = roomInfo.roomType;
        this.bidet = roomInfo.bidet;
        this.bedSize = roomInfo.bedSize;
        this.numBeds = roomInfo.numBeds;
        this.costPerNight = roomInfo.costPerNight;
    }

    retrieveBookings(bookingsData) {
        this.bookings = bookingsData.filter(booking => booking.roomNumber === this.number);
    }

    checkIfBooked(date) {
        let booked = false;
        this.bookings.forEach(booking => {
            if (booking.date === date) {
                booked = true;
            }
        })
        return booked;
    }

}

export default Room