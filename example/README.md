## Minosse exaple project
The goal of this mini project is to show the usage of Minosse as testing framework for your API.
In order to do that we have created a simple API with [ExpressJS](http://expressjs.com/) that expose
3 endpoints:

* **GET /** returns
    * Staus code: 200
    * Body: `{message: 'hello world'}`
* **GET /hello/:name** returns
    * Status code: 200
    * Body: `{message: 'hello {{name}}'}`, *name* is what found in the path parameter
* **POST /hello** returns
    * Status code: 200
    * Body: `{message: 'hello {{name}}'}`, *name* is retrieved from the request body

### How top use this example
Cd into this folder and run `npm install` to install the packages needed. Then run the server with
`node server.js`. Once the server is up and running run the tests with
`npm test`
