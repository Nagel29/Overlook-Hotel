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

}

export default Room