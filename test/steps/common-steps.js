var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp').sync;

module.exports = function commonSteps() {
    var logDir = path.join(__dirname, '../../logs');
    mkdirp(logDir);
    var logPath = path.join(logDir, 'test-runner.log');
    if (fs.existsSync(logPath)) {
        //Remove existing logfile.
        fs.unlinkSync(logPath);
    }
    var logStream = fs.createWriteStream(logPath);

    this.createLogger({
        name: 'test-steps',
        streams: [{
            stream: logStream,
            level: 'trace'
        }]
    });
};
