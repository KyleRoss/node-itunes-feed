"use strict";
/* global AssertionError */
const assert = require('assert');
const ITunesFeed = require('../lib/ITunesFeed');
const Feed = require('../lib/Feed');
const { medias } = require('../lib/constants');

describe('ITunesFeed', function() {
    describe ('Class', () => {
        it('should have getter for uninstantiated class', () => {
            let inst = new ITunesFeed();
            assert.equal(typeof inst.ITunesFeed, 'function');
            assert.equal(inst.ITunesFeed.name, 'ITunesFeed');
        });
    });
    
    describe('Constructor', () => {
        it('should have default options', () => {
            let inst = new ITunesFeed();
            
            assert.equal(inst.options.countryCode, 'us');
            assert.equal(inst.options.limit, 100);
            assert.equal(inst.options.explicit, true);
        });
        
        it('should override default options', () => {
            let inst = new ITunesFeed({
                countryCode: 'al',
                limit: 50,
                explicit: false
            });
            
            assert.equal(inst.options.countryCode, 'al');
            assert.equal(inst.options.limit, 50);
            assert.equal(inst.options.explicit, false);
        });
        
        it ('should create an instance of axios', () => {
            let inst = new ITunesFeed();
            
            assert(inst._axios);
        });
    });
    
    describe ('Internal Methods', () => {
        describe ('_mergeOptions()', () => {
            let inst = new ITunesFeed();
            
            it('should merge options', () => {
                let res = inst._mergeOptions({ countryCode: 'al' });
                assert.equal(res.countryCode, 'al');
                assert.equal(res.limit, 100);
                assert.equal(res.explicit, true);
            });
            
            it ('should merge options into custom defaults', () => {
                let res = inst._mergeOptions({ countryCode: 'al' }, { limit: 50 });
                assert.equal(res.countryCode, 'al');
                assert.equal(res.limit, 50);
                assert.equal(res.explicit, undefined);
            });
            
            describe ('Errors', () => {
                it('should throw error when no country code is set', () => {
                    assert.throws(function() {
                        inst._mergeOptions({ countryCode: null }, { limit: 100 });
                    });
                });
                
                it('should throw error when country code is not 2 characters', () => {
                    assert.throws(function() {
                        inst._mergeOptions({ countryCode: 'abc' }, { limit: 100 });
                    });
                });
                
                it('should throw error when an invalid country code is set', () => {
                    assert.throws(function() {
                        inst._mergeOptions({ countryCode: 'zz' }, { limit: 100 });
                    });
                });
                
                it('should throw error when no limit is set', () => {
                    assert.throws(function() {
                        inst._mergeOptions({ limit: null }, { countryCode: 'us' });
                    });
                });
                
                it('should throw error when invalid limit is set', () => {
                    assert.throws(function() {
                        inst._mergeOptions({ limit: 200 }, { countryCode: 'us' });
                    });
                });
            });
        });
        
        describe ('_validateFeedType()', () => {
            let inst = new ITunesFeed();
            
            it('should return true when feed type is matched', () => {
                assert.equal(inst._validateFeedType(['test'], 'test'), true);
            });
            
            it ('should throw error if type is not provided', () => {
                assert.throws(function() {
                    inst._validateFeedType([]);
                });
            });
            
            it ('should throw error when no feed type is matched', () => {
                assert.throws(function() {
                    inst._validateFeedType(['abc'], ['123']);
                });
            });
        });
        
        describe ('_generateFeedURL()', function() {
            let inst = new ITunesFeed();
            
            it('should generate an explicit feed url', async () => {
                let res = await inst._generateFeedURL('us', 'apple-music', 'top-songs', 'all', 50, true);
                assert.equal(res, 'https://rss.itunes.apple.com/api/v1/us/apple-music/top-songs/all/50/explicit.json');
            });
            
            it('should generate an non-explicit feed url', async () => {
                let res = await inst._generateFeedURL('us', 'apple-music', 'top-songs', 'all', 50, false);
                assert.equal(res, 'https://rss.itunes.apple.com/api/v1/us/apple-music/top-songs/all/50/non-explicit.json');
            });
        });
        
        describe ('_getFeed()', function() {
            this.timeout(5000);
            let inst = new ITunesFeed({
                limit: 10
            });
            
            it('should return an instance of Feed', async () => {
                let res = await inst._getFeed(medias.APPLE_MUSIC, 'top-songs', 'all');
                assert(res instanceof Feed);
            });
            
            it('should throw an error with an improper feed', async () => {
                let testMedia = {
                    mediaType: 'test',
                    types: ['test']
                };
                
                try {
                    await inst._getFeed(testMedia, 'test', 'all');
                } catch(e) {
                    if(e && e instanceof Error) {
                        assert.equal(e.message, 'iTunes Feed not found. Please check your parameters.');
                        return true;
                    }
                }
                
                throw new AssertionError('Did not throw an error with an improper feed');
            });
        });
    });
    
    describe('Methods', function() {
        this.timeout(5000);
        let inst = new ITunesFeed({
            limit: 25
        });
        
        describe ('appleMusic()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.appleMusic();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.appleMusic('hot-tracks', { limit: 10 });
                assert(res instanceof Feed);
            });
        });
        
        describe ('audioBooks()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.audioBooks();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.audioBooks({ limit: 10 });
                assert(res instanceof Feed);
            });
        });
        
        describe ('books()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.books();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.books('top-paid', { limit: 10 });
                assert(res instanceof Feed);
            });
        });
        
        describe ('iosApps()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.iosApps();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.iosApps('top-paid', 'games', { limit: 10 });
                assert(res instanceof Feed);
            });
            
            it ('should throw an error if invalid genre is provided', async () => {
                try {
                    await inst.iosApps('top-paid', 'not-valid', { limit: 10 });
                } catch(e) {
                    if(e && e instanceof Error) return true;
                }
                
                throw new AssertionError('Did not throw an error for an invalid genre');
            });
            
            it ('should throw an error if invalid genre is provided for given feed type', async () => {
                try {
                    await inst.iosApps('top-paid-ipad', 'games', { limit: 10 });
                } catch(e) {
                    if(e && e instanceof Error) return true;
                }
                
                throw new AssertionError('Did not throw an error for an invalid genre');
            });
        });
        
        describe ('itunesMusic()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.itunesMusic();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.itunesMusic('new-music', { limit: 10 });
                assert(res instanceof Feed);
            });
        });
        
        describe ('itunesU()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.itunesU();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.itunesU({ limit: 10 });
                assert(res instanceof Feed);
            });
        });
        
        describe ('macApps()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.macApps();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.macApps('top-free-mac-apps', { limit: 10 });
                assert(res instanceof Feed);
            });
        });
        
        describe ('movies()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.movies();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.movies({ limit: 10 });
                assert(res instanceof Feed);
            });
        });
        
        describe ('musicVideos()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.musicVideos();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.musicVideos({ limit: 10 });
                assert(res instanceof Feed);
            });
        });
        
        describe ('podcasts()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.podcasts();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.podcasts({ limit: 10 });
                assert(res instanceof Feed);
            });
        });
        
        describe ('tvShows()', () => {
            it('should return an instance of Feed with default options', async () => {
                let res = await inst.tvShows();
                assert(res instanceof Feed);
            });
            
            it ('should return an instance of feed with custom options', async () => {
                let res = await inst.tvShows('top-tv-seasons', { limit: 10 });
                assert(res instanceof Feed);
            });
        });
    });
});
