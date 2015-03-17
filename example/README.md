## Minosse exaple project
The goal of this mini project is to show the usage of Minosse as testing framework for your API.
In order to do that we have created a simple API with [ExpressJS](http://expressjs.com/) that expose
4 endpoints:

* **GET /** returns
    * Staus code: 200
    * Body: `{message: 'hello world'}`
* **GET /hello/:name** returns
    * Status code: 200
    * Body: `{message: 'hello {{name}}'}`, *name* is what found in the path parameter
* **POST /hello** returns
    * Status code: 200
    * Body: `{name:{name}'}`, *name* is retrieved from the request body
* **POST /hello/lastName** returns
    * Status code: 200
    * Body: `{lastName:{name}'}`, *lastName* is retrieved from the request body

### How top use this example
Cd into this folder and run `npm install` to install the packages needed. Then ruin the server with
`node server.js`. Once the server is up and running run the tests with
`./node_modules/cucumber/bin/cucumber.js test/*.feature -r istanbul-instrumented-lib.tmp/steps.js -r test/steps/ -f pretty`
