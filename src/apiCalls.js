import { fetchFail, hide, show } from "./scripts"

let fetchData = (endPoint) => {
    return fetch(`http://localhost:3001/api/v1/${endPoint}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                hide(fetchFail)
                return response.json()
            }
        })
        .catch(error => {
            console.log(error.message);
            show(fetchFail);
        })
}



let postBooking = (bookingInfo) => {
    return fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "userID": bookingInfo.userID , "date": bookingInfo.date , "roomNumber": bookingInfo.roomNumber })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        } else {
            hide(fetchFail)
            return response.json()
        }
    })
    .catch(error => {
        console.log(error.message);
        show(fetchFail);
    })
}

export { fetchData, postBooking };