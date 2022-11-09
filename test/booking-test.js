import chai from 'chai';
import Booking from '../src/booking-class.js';
import Customer from '../src/customer-class.js';
import customerData from '../src/test-data/customer-data';
import roomData from '../src/test-data/room-data';
const expect = chai.expect;

describe('Booking', function() {
  let customer, room, date, booking;

  beforeEach(() => {
    room = roomData;
    date = '11/22/2022'
    customer = new Customer(customerData)
    booking = new Booking(customer, room, date)
  })

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should have a user id', function() {
    expect(booking.userID).to.equal(1);
  });

  it('should have a room number', function() {
    expect(booking.roomNumber).to.equal(2);
  });

  it('should have a date', function() {
    expect(booking.date).to.equal('11/22/2022');
  });



});
