class Booking {
    constructor(bookingInfo) {
        this.userID = bookingInfo.userID;
        this.roomNumber = bookingInfo.roomNumber;
        this.date = bookingInfo.date;
        if (bookingInfo.id) {
            this.id = bookingInfo.id;
        };
    };

    retrieveRoomInfo(roomData) {
        return roomData.find(room => room.number === this.roomNumber)
    }
}

export default Booking