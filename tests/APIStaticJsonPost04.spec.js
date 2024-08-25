import{test,expect} from '@playwright/test';
const staticJson = require('../Util/post_dynamic_request_body.json');
import { stringFormat } from '../function_convert/common';


test('Create POST API request using dynamic Json file',async({request})=>{

    const dynamicRequestBody = stringFormat(JSON.stringify(staticJson),"Testers Talk Cypress","JavaScript","Apple")

const PostAPIResponse = await request.post('https://restful-booker.herokuapp.com/booking',{
    data:JSON.parse(dynamicRequestBody),
})

expect(PostAPIResponse.ok()).toBeTruthy();
expect(PostAPIResponse.status()).toBe(200);
const jsonAPIresponse = await PostAPIResponse.json();
console.log(jsonAPIresponse);
expect(jsonAPIresponse.booking).toHaveProperty("firstname","Testers Talk Cypress");
expect(jsonAPIresponse.booking).toHaveProperty("lastname","JavaScript");
expect(jsonAPIresponse.booking).toHaveProperty("additionalneeds","Apple");

expect(jsonAPIresponse.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
expect(jsonAPIresponse.booking.bookingdates).toHaveProperty("checkout","2019-01-01");

})