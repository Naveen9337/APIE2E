import{test,expect} from '@playwright/test';


test('Create POST API request using static request body',async({request})=>{

const PostAPIResponse = await request.post('https://restful-booker.herokuapp.com/booking',{
    data:{

        "firstname": "Naveen",
        "lastname": "Shrivastava",
        "totalprice": 1000,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "super bowls"

    }
})

expect(PostAPIResponse.ok()).toBeTruthy();
expect(PostAPIResponse.status()).toBe(200);
const jsonAPIresponse = await PostAPIResponse.json();
console.log(jsonAPIresponse);
expect(jsonAPIresponse.booking).toHaveProperty("firstname","Naveen");
expect(jsonAPIresponse.booking).toHaveProperty("lastname","Shrivastava");

expect(jsonAPIresponse.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
expect(jsonAPIresponse.booking.bookingdates).toHaveProperty("checkout","2019-01-01");

})