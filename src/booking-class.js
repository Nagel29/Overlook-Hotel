import roomData from './test-data/room-data.js';

class Booking {
    constructor(customerInfo, room, date) {
        this.userID = customerInfo.id;
        this.roomNumber = room.number;
        this.date = date;
    }

    // generateID() {
        
    // }

    retrieveRoomInfo() {
        return roomData.find(room => room.number === this.roomNumber)
    }
}

export default Booking