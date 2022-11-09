import chai from 'chai';
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



});
