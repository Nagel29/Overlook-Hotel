class Booking {
    constructor(bookingInfo) {
        this.userID = bookingInfo.userID;
        this.roomNumber = bookingInfo.roomNumber;
        this.date = bookingInfo.date;
        if (bookingInfo.id) {
            this.id = bookingInfo.id;
        };
    };

    // generateID(latestID) {
    //     let characters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    //     let splitID = latestID.split('');
    //     splitID.reverse();
    //     let prevChar;
    //     let newID = splitID.reduce((acc, letter, index) => {
    //         let charIndex = characters.indexOf(letter);
    //         if (index === 0 && letter !== 'z') {
    //             prevChar = characters[charIndex + 1]
    //             acc.push(prevChar)
    //         } else if (index === 0 && letter === 'z') {
    //             prevChar = characters[0];
    //             acc.push(prevChar);
    //         } else if (prevChar === '0' && letter === 'z') {
    //             acc.push(characters[0]);
    //             prevChar = characters[0];
    //         } else if (prevChar === '0' && letter !== 'z') {
    //             acc.push(characters[charIndex + 1]);
    //             prevChar = characters[charIndex + 1];
    //         } else {
    //             acc.push(letter)
    //             prevChar = letter;
    //         }
    //         return acc;
    //     }, [])
    //     newID = newID.reverse().join('');
    //     this.id = newID;
    // }

    retrieveRoomInfo(roomData) {
        return roomData.find(room => room.number === this.roomNumber)
    }
}

export default Booking