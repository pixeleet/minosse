var PORT = 8080;

module.exports = function startParrotServer() {
    var server = null;

    this.registerHandler('BeforeFeatures', function BeforeFeatures(e, done) {
        var http = require('http');

        server = http.createServer(function requestHandler(req, res) {
            var reqType = req.headers['request-type'];
            switch (reqType) {
                case 'delay':
                    delay(req, res);
                    break;
                default:
                    parrot(req, res);
                    break;
            }
        });

        //Return the request body back as response.
        function parrot(req, res) {
            copySelectedHeaders(req, res);
            req.pipe(res);
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

        server.listen(PORT, done);
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

    this.registerHandler('AfterFeatures', function AfterFeatures(e, done) {
        server.close(done);
    });

    this.Given('host name and port are configured', function(done) {
        this.testConfig = this.testConfig || {};
        this.testConfig.defaultHost = 'localhost';
        this.testConfig.defaultPort = 8080;
        done();
    });
};
