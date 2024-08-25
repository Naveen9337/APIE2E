import{test,expect} from '@playwright/test';
//const staticJson = require('../Util/Staic.json');
import {faker} from '@faker-js/faker';
const { DateTime } = require('luxon');
//Console.log("Add 1")


test('Create POST API request using dynamic request body',async({request})=>{

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalprice = faker.number.int(1000);
    const checkin = DateTime.now().toFormat('YYYY-MM-dd');
    const checkout = DateTime.now().plus({day:5}).toFormat('YYYY-MM-dd');

const PostAPIResponse = await request.post('https://restful-booker.herokuapp.com/booking',{
    data: {
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalprice,
        "depositpaid": true,
        "bookingdates": {
            "checkin":checkin,
            "checkout": checkout
        },
        "additionalneeds": "super bowls"
    },
})

expect(PostAPIResponse.ok()).toBeTruthy();
expect(PostAPIResponse.status()).toBe(200);
const jsonAPIresponse = await PostAPIResponse.json();
console.log(jsonAPIresponse);
expect(jsonAPIresponse.booking).toHaveProperty("firstname",firstName);
expect(jsonAPIresponse.booking).toHaveProperty("lastname",lastName);
expect(jsonAPIresponse.booking).toHaveProperty("totalprice",totalprice);

// expect(jsonAPIresponse.booking.bookingdates).toHaveProperty("checkin",checkin);
// expect(jsonAPIresponse.booking.bookingdates).toHaveProperty("checkout",checkout);

})