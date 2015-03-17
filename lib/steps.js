var _ = require('lodash');
var bunyan = require('bunyan');
var formatValidators = require('./formatValidators');

module.exports = function apiTestSteps() {
    this.World = function World(done) {
        this._context = {};
        done();
    };

    this.createLogger = function createLogger(options) {
        this.World.prototype._log = bunyan.createLogger(options);
    };

    this.setTestConfig = function setTestConfig(config) {
        this.World.prototype.testConfig = config;
    };

    this.createLogger({
        name: 'test-steps',
        streams: []
    });

    this.World.prototype.formatValidators = formatValidators;
    this.addFormatValidators = function addFormatValidators(extraFormatValidators) {
        _.extend(this.World.prototype.formatValidators, extraFormatValidators);
    };

    this.Before(function(scenario, done) {
        this._log.info('Scenario: %s', scenario.getName());
        done();
    });

    //This file is loaded by cucumber.js. Load submodules in turn.
    require('./steps/debug-steps').call(this);
    require('./steps/http-steps').call(this);
    require('./steps/property-steps').call(this);
};
