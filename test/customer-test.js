import chai from 'chai';
import bookingData from '../src/test-data/booking-data';
import Customer from '../src/customer-class.js';
import customerData from '../src/test-data/customer-data';
const expect = chai.expect;

describe('Customer', function() {
  let customer;

  beforeEach(() => {
    customer = new Customer(customerData)
  })

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should have an id', function() {
    expect(customer.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(customer.name).to.equal('Bill Paxton');
  });

  it('should be able to retrieve bookings', function() {
    expect(customer.retrieveBookings(bookingData)).to.deep.equal([{
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


});
