import roomData from './test-data/room-data.js';

class Booking {
    constructor(bookingInfo) {
        this.userID = bookingInfo.userID;
        this.roomNumber = bookingInfo.roomNumber;
        this.date = bookingInfo.date;
    }

    // generateID() {
        
    // }

    retrieveRoomInfo() {
        return roomData.find(room => room.number === this.roomNumber)
    }
}

export default Booking