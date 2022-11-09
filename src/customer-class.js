class Customer {
    constructor(customerInfo) {
        this.id = customerInfo.id;
        this.name = customerInfo.name;
    }

    retrieveBookings(allBookings) {
        return allBookings.filter(booking => booking.userID === this.id)
    }
}

export default Customer