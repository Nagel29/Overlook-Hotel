import chai from 'chai';
import bookingData from '../src/test-data/booking-data';
import Customer from '../src/customer-class.js';
import customerData from '../src/test-data/customer-data';
import roomData from '../src/test-data/room-data';
const expect = chai.expect;

describe('Customer', function() {
  let customer, allRooms;

  beforeEach(() => {
    customer = new Customer(customerData)
    allRooms = roomData;
    customer.retrieveAllBookings(bookingData)
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should have an id', function() {
    expect(customer.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(customer.name).to.equal('Bill Paxton');
  });

  it('should be able to retrieve all their bookings', function() {
    customer.retrieveAllBookings(bookingData)
    expect(customer.bookings).to.deep.equal([{
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 1,
      "date": "2022/01/24",
      "roomNumber": 24
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
    }]);
  });

  it('should be able to retrieve past bookings', function() {
    expect(customer.retrievePastBookings()).to.deep.equal([{
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 1,
      "date": "2022/01/24",
      "roomNumber": 24
    },
    {
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2022/02/05",
      "roomNumber": 12
    }]);
  });

  it('should be able to retrieve future bookings', function() {
    expect(customer.retrieveFutureBookings()).to.deep.equal([
      {
      "id": "5fwrgu4i7k55hblah",
      "userID": 1,
      "date": "2023/02/05",
      "roomNumber": 12
    }]);
  });

  it('should be able to calculate total cost spent on rooms', function() {
    expect(customer.calculateTotalSpent(customer.bookings, allRooms)).to.equal(671.42);
  });


});
