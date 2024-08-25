import{test,expect} from '@playwright/test';
const staticJson = require('../Util/Staic.json');


test('Create POST API request using static Json file',async({request})=>{

const PostAPIResponse = await request.post('https://restful-booker.herokuapp.com/booking',{
    data:staticJson,
})

expect(PostAPIResponse.ok()).toBeTruthy();
expect(PostAPIResponse.status()).toBe(200);
const jsonAPIresponse = await PostAPIResponse.json();
console.log(jsonAPIresponse);
expect(jsonAPIresponse.booking).toHaveProperty("firstname","Testers Talk");
expect(jsonAPIresponse.booking).toHaveProperty("lastname","API Testing");

expect(jsonAPIresponse.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
expect(jsonAPIresponse.booking.bookingdates).toHaveProperty("checkout","2019-01-01");

})