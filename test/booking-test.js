import chai from 'chai';
import Booking from '../src/booking-class.js';
import bookingData from '../src/test-data/booking-data.js';
import Customer from '../src/customer-class.js';
import customerData from '../src/test-data/customer-data.js';
import roomData from '../src/test-data/room-data';
const expect = chai.expect;

describe('Booking', function() {
  let booking, bookingInfo;

  beforeEach(() => {
    bookingInfo = { userID: customerData.id, roomNumber: roomData[14].number, date: '2022/04/22' }; 
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

  // it('should be able to generate a new booking ID', function() {
  //   let lastID = '5fwrgu4i7k55hblzy';
  //   booking.generateID(lastID);
  //   expect(booking.id).to.equal('5fwrgu4i7k55hblzz');

  //   lastID = '5fwrgu4i7k55hblzz';
  //   booking.generateID(lastID);
  //   expect(booking.id).to.equal('5fwrgu4i7k55hbm00');

  //   lastID = '5fwrgu4i7k55hbl00';
  //   booking.generateID(lastID)
  //   expect(booking.id).to.equal('5fwrgu4i7k55hbm01');
  // });
});
