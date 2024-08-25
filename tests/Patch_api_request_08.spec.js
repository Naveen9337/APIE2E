import{test,expect} from '@playwright/test';
const staticJson = require('../Util/post_dynamic_request_body.json');

import { stringFormat } from '../function_convert/common';
const payload = require('../Util/put_api_token_generator.json');
const putreqbody = require('../Util/put_request_body.json');
const Patch_payload = require('../Util/Patch_Body.json');

test('PATCH api Request',async({request})=>{

 const dynamicRequestBody =  stringFormat(JSON.stringify(staticJson),"Testers Talk Cypress","JavaScript","Orange");

const PostAPIResponse =  await request.post("/booking",{
    data : JSON.parse(dynamicRequestBody)
 })
  console.log(PostAPIResponse);
 expect(PostAPIResponse.ok()).toBeTruthy();
 expect(PostAPIResponse.status()).toBe(200);

 const DynamicResponseBody = await PostAPIResponse.json();
 console.log(DynamicResponseBody);
 const bid = DynamicResponseBody.bookingid;
 expect(DynamicResponseBody.booking).toHaveProperty("firstname",'Testers Talk Cypress');
 expect(DynamicResponseBody.booking).toHaveProperty('lastname','JavaScript');
 expect(DynamicResponseBody.booking).toHaveProperty('additionalneeds','Orange');

 expect(DynamicResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
expect(DynamicResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");

console.log("=================================Get API Call ================================================")

const getrequestbody = await request.get(`/booking/${bid}`);
const getresponsebody = await getrequestbody.json();
console.log(getresponsebody);

console.log("================================================PGenerate Token=========================================")

const token_gen_req_body = await request.post('/auth',{
    data : payload,
})

expect(token_gen_req_body.ok()).toBeTruthy();
expect(token_gen_req_body.status()).toBe(200);

const token_Generate_response = await token_gen_req_body.json();
console.log(token_Generate_response);
const token_no = await token_Generate_response.token;
console.log(token_no);

console.log("==============================================PUT API CALL To Update================================")
const putresponse = await request.put(`/booking/${bid}`,{
   headers : {
    "Content-Type" : "application/json",
   "Cookie": `token=${token_no}`,
   },
   data : putreqbody,
}


)

expect(putresponse.ok()).toBeTruthy();
expect(putresponse.status()).toBe(200);

const putresponsebody = await putresponse.json();
console.log(putresponsebody);

console.log('===================================================PATCH API REQUEST============================')

const patchreqbody = await request.patch(`/booking/${bid}`,{
    headers : {
        "Content-Type" : "application/json",
       "Cookie": `token=${token_no}`,
       },
       data : Patch_payload,
    }
    
    
    )
      
      expect(patchreqbody.ok()).toBeTruthy();
      expect(patchreqbody.status()).toBe(200);

      const patchrespbody = await patchreqbody.json();

      console.log(patchrespbody);
})
