import chai from 'chai';
import Room from '../src/room-class';
import bookingData from '../src/test-data/booking-data';
import roomData from '../src/test-data/room-data';
const expect = chai.expect;

describe('Room', function() {
let room, sadRoom;

  beforeEach(() => {
    room = new Room(roomData[11]);
    sadRoom = new Room(roomData[1]);

  })

  it('should be a function', function() {
    expect(Room).to.be.a('function');
  });

  it('should have a room number', function() {
    expect(room.number).to.equal(12);
  });

  it('should have a room type', function() {
    expect(room.roomType).to.equal('single room');
  });

  it('should have a bidet property', function() {
    expect(room.bidet).to.equal(false);
  });

  it('should have a bed size', function() {
    expect(room.bedSize).to.equal('twin');
  });


  it('should have a number of beds', function() {
    expect(room.numBeds).to.equal(2);
  });

  it('should have a cost per night', function() {
    expect(room.costPerNight).to.equal(172.09);
  });

  it('should be able to retrieve bookings', function() {
    room.retrieveBookings(bookingData)
    expect(room.bookings).to.deep.equal([
        {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 13,
        "date": "2022/01/10",
        "roomNumber": 12
        },
        {
            "id": "5fwrgu4i7k55hl6t8",
            "userID": 1,
            "date": "2022/02/05",
            "roomNumber": 12
        },
        {
            "id": "5fwrgu4i7k55hblah",
            "userID": 1,
            "date": "2023/02/05",
            "roomNumber": 12
        }
    ]);
  });


  it('should retrieve an empty array when there are no bookings for the room', function() {
    sadRoom.retrieveBookings(bookingData)
    expect(sadRoom.bookings).to.deep.equal([]);
  });

});