import chai from 'chai';
import Booking from '../src/booking-class.js';
import customerData from '../src/test-data/customer-data.js';
import roomData from '../src/test-data/room-data';
const expect = chai.expect;

describe('Booking', function() {
  let booking, bookingInfo;

  beforeEach(() => {
    bookingInfo = { userID: customerData[0].id, roomNumber: roomData[14].number, date: '2022/04/22' }; 
    booking = new Booking(bookingInfo)
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should have a user id', function() {
    expect(booking.userID).to.equal(1);
  });

  it('should have a room number', function() {
    expect(booking.roomNumber).to.equal(15);
  });

  it('should have a date', function() {
    expect(booking.date).to.equal('2022/04/22');
  });

  it('should be able to retrieve room information', function() {
    expect(booking.retrieveRoomInfo(roomData)).to.deep.equal({
      "number": 15,
      "roomType": "residential suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 1,
      "costPerNight": 294.56
    });
  });
  
});
