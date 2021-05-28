## Prerequisite
1. Node 10 or later
2. Postman (For testing the apis)
3. Hosted MongoDB service

## Running the project
### Install dependencies
`npm install`
### Running Staging
`npm run dev `
### Running in Production
1. `export NODE_ENV=production` (For linux systems)
2. `npm start `



## Postman Collection Link
https://www.getpostman.com/collections/b069aa4b2a3390101fad

## API: <endpoint>/api/initiate-order
### API Use Case
This api will be used to initiate the order. Ideally when user clicks on pay button, this api should be hit.

### Request Body Details

###### Required Fields: order_id, amount, phone_number

You can pass at max 5 parameters in the request.
1. **order_id**: (string) Must be unique per order or retry and needs to be generated and passed here.
2. **amount**: (decimal) Order amount upto 2 decimal points
3. **phone_number**: (string) Phone number of the user, must be unique and required
4. **name**: (string) Full name of the user
5. **email_id**: (string) Email Id of the user

**Always try to pass same email id for a same phone number, as a unique hash is created using these 2 fields**

## API: <endpoint>/api/verify-order
### API Use Case
This api will be used to verify the order. Ideally this api should be triggered when payment is completed and callback function is triggered.
You have to hit this api for success as well as failed transactions.

### Request Body Details

###### Required Fields: txn_id, CHECKSUMHASH

You can pass at max 5 parameters in the request.
1. **txn_id**: (string) This is same order id that was initially passed during initiating the order (initiate-order api).
2. **CHECKSUMHASH**: (string) Checksum hash retuned in the initiate-order api

> **Please checkout postman collection for further request and response details
