"use strict";
const assert = require('assert');
const itunesFeed = require('../');

describe('Module', function() {
    it('should return an instance of ITunesFeed', function() {
        assert.equal(itunesFeed.constructor.name, 'ITunesFeed');
    });
    
    it('should have access to uninstantiated class', function() {
        assert(typeof itunesFeed.ITunesFeed === 'function');
    });
});
