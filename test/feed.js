"use strict";
const assert = require('assert');
const Feed = require('../lib/Feed');
const testFeed = require('./assets/test-feed.json');

describe('Feed', function() {
    let feed = new Feed(testFeed);
    
    it('should extend Array', function() {
        assert(feed instanceof Array);
    });
    
    it ('should have a length of 10', () => {
        assert.equal(feed.length, 10);
    });
    
    describe ('Getters', () => {
        it ('should have title', () => {
            assert.equal(typeof feed.title, 'string');
            assert.equal(feed.title, 'Top Courses');
        });
        
        it ('should have url', () => {
            assert.equal(typeof feed.url, 'string');
            assert.equal(feed.url, 'https://rss.itunes.apple.com/api/v1/us/itunes-u/top-itunes-u-courses/all/10/explicit.json');
        });
        
        it ('should have countryCode', () => {
            assert.equal(typeof feed.countryCode, 'string');
            assert.equal(feed.countryCode, 'us');
        });
        
        it ('should have updated', () => {
            assert.equal(typeof feed.updated, 'object');
            assert(feed.updated instanceof Date);
            assert.equal(feed.updated.toISOString(), '2019-04-03T09:59:08.000Z');
        });
    });
});
