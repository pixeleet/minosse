var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
var bluebird = require('bluebird');

var HTTP_PORT = 8080;
var HTTPS_PORT = 8081;

module.exports = function startParrotServer() {
    var server = null;
    var secureServer = null;
    var cert = fs.readFileSync(path.resolve(__dirname, '../data/customer-server.crt'), 'utf8');
    var key = fs.readFileSync(path.resolve(__dirname, '../data/customer-server.key'), 'utf8');
    var options = { key: key, cert: cert };
    options.agent = new https.Agent(options);

    this.registerHandler('BeforeFeatures', function BeforeFeatures(e, done) {

        server = http.createServer(requestHandler).listen(HTTP_PORT);

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED || 0;
        secureServer = https.createServer(options, requestHandler).listen(HTTPS_PORT);

        function requestHandler(req, res) {
            var reqType = req.headers['request-type'];
            switch (reqType) {
                case 'delay':
                    delay(req, res);
                    break;
                default:
                    parrot(req, res);
                    break;
            }
        }

        //Return the request body back as response.
        function parrot(req, res) {
            copySelectedHeaders(req, res);
            return req.pipe(res);
        }

        //Answer only the second call to a specific path with a 200.
        var cachedRequest = {};
        function delay(req, res) {
            var url = req.url;
            //This is the first call. Return a 404.
            if (!cachedRequest[url]) {
                cachedRequest[url] = true;
                res.statusCode = 404;
                return res.end();
            }
            //This is a subsequent call. Imitate the parrot server.
            parrot(req, res);
        }
        done();
    });

    function copySelectedHeaders(req, res) {
        var headers = req.headers;
        var headerNames = Object.keys(headers);
        headerNames
            .filter(function isTestHeader(headerName) {
                return /^test-/.test(headerName);
            })
            .forEach(function addHeaderToRest(headerName) {
                var headerValue = headers[headerName];
                res.setHeader(headerName, headerValue);
            });
    }

    function handleServerClosePromise(callback) {
        return this.close(callback);
    }

    this.registerHandler('AfterFeatures', function AfterFeatures(e, done) {
        var Promise = bluebird.Promise;
        var closeServerPromise = Promise.fromNode(handleServerClosePromise.bind(server));
        var closeSecureServerPromise = Promise.fromNode(handleServerClosePromise.bind(secureServer));
        return Promise.all([closeServerPromise, closeSecureServerPromise]).nodeify(done);
    });



    this.Given('host name and port are configured', function(done) {
        this.testConfig = this.testConfig || {};
        this.testConfig.defaultHost = 'localhost';
        this.testConfig.defaultPort = 8080;
        done();
    });
};
