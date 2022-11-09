import chai from 'chai';
import Booking from '../src/booking-class.js';
import bookingData from '../src/test-data/booking-data';
import Customer from '../src/customer-class.js';
import customerData from '../src/test-data/customer-data';
import roomData from '../src/test-data/room-data';
const expect = chai.expect;

describe('Booking', function() {
  let bookingInfo, booking;

  beforeEach(() => {
    bookingInfo = bookingData[0]
    booking = new Booking(bookingInfo)
  })

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should have a user id', function() {
    expect(booking.userID).to.equal(9);
  });

  it('should have a room number', function() {
    expect(booking.roomNumber).to.equal(15);
  });

  it('should have a date', function() {
    expect(booking.date).to.equal('2022/04/22');
  });

  it('should be able to retrieve room information', function() {
    expect(booking.retrieveRoomInfo()).to.deep.equal({
      "number": 15,
      "roomType": "residential suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 1,
      "costPerNight": 294.56
    });
  });


});
