"use strict";
const axios = require('axios');
const Feed = require('./Feed');
const { medias, countries, limits } = require('./constants');

/**
 * Class exported from itunes-feed.
 * @typicalname itunesFeed
 */
class ITunesFeed {
    /**
     * Access to uninstantiated ITunesFeed class for advanced usage.
     * @readonly
     * @type {ITunesFeed}
     */
    get ITunesFeed() {
        return ITunesFeed;
    }
    
    /**
     * Creates a new instance of ITunesFeed.
     * @param {Object}  [options={}] Optional object for configuring ITunesFeed. These options can be set on the instance (`this.options`).
     * @param {String}  [options.countryCode='us'] 2 letter country code to use for all requests. Must be lowercase.
     * @param {Number}  [options.limit=100] Limit of items returned in a feed. Must be one of: `10`, `25`, `50` or `100`. Any other value will throw an error.
     * @param {Boolean} [options.explicit=true] Whether to include explicit results.
     * @param {Object}  [options.axiosOptions] Object containing additional options to pass to [axios](https://github.com/axios/axios#request-config).
     * @example 
     * const ITunesFeed = require('itunes-feed').ITunesFeed;
     * const itunesFeed = new ITunesFeed({
     *     // options...
     * });
     */
    constructor(options = {}) {
        /**
         * Global options set on this instance. You may change these options at any time.
         * @type {Object}
         * @example 
         * itunesFeed.options.limit = 50;
         */
        this.options = this._mergeOptions(options, {
            countryCode: 'us',
            limit: 100,
            explicit: true
        });
        
        this._axios = axios.create();
    }
    
    /**
     * Retrieves feed for Apple Music.
     * @param {String} [feedType='top-songs'] The type of feed to retrieve. Must be one of: `coming-soon`, `hot-tracks`, `new-releases`, `top-albums`, `top-songs`.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.appleMusic();
     * //=> [...]
     * 
     * let feed = await itunesFeed.appleMusic('hot-tracks', {
     *     explicit: false
     * });
     */
    appleMusic(feedType = 'top-songs', options = {}) {
        return this._getFeed(medias.APPLE_MUSIC, feedType, 'all', options);
    }
    
    /**
     * Retrieves feed for Audiobooks.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.audioBooks();
     * //=> [...]
     */
    audioBooks(options = {}) {
        return this._getFeed(medias.AUDIOBOOKS, 'top-audiobooks', 'all', options);
    }
    
    /**
     * Retrieves feed for Books.
     * @param {string} [feedType='top-free'] The type of feed to retrieve. Must be one of: `top-free`, `top-paid`.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.books();
     * //=> [...]
     */
    books(feedType = 'top-free', options = {}) {
        return this._getFeed(medias.BOOKS, feedType, 'all', options);
    }
    
    /**
     * Retrieves feed for iOS Apps.
     * @param {string} [feedType='top-free'] The type of feed to retrieve. Must be one of: `new-apps-we-love`, `new-games-we-love`, `top-free`, `top-free-ipad`, `top-grossing`, `top-grossing-ipad`, `top-paid`.
     * @param {string} [genre='all'] Optional genre to retrieve. The only available genres are `all` and `games`. The `games` genre is only available on `top-free` and `top-paid` feed types.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @throws {Error} If an invalid genre is provided.
     * @throws {Error} If the genre is set to `games` on a feed type that is not `top-free` or `top-paid`.
     * @example 
     * let feed = await itunesFeed.iosApps();
     * //=> [...]
     * 
     * let feed = await itunesFeed.iosApps('top-paid', 'games');
     */
    iosApps(feedType = 'top-free', genre = 'all', options = {}) {
        if(['all', 'games'].indexOf(genre) === -1) {
            throw new Error(`Invalid genre provided. Must be one of: all, games`);
        }
        
        if(genre === 'games' && ['top-free', 'top-paid'].indexOf(feedType) === -1) {
            throw new Error('Genre "games" is only available on: top-free, top-paid');
        }
        
        return this._getFeed(medias.IOS_APPS, feedType, genre, options);
    }
    
    /**
     * Retrieves feed for iTunes Music.
     * @param {string} [feedType='top-songs'] The type of feed to retrieve. Must be one of: `new-music`, `recent-releases`, `top-albums`, `top-songs`.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.itunesMusic();
     * //=> [...]
     */
    itunesMusic(feedType = 'top-songs', options = {}) {
        return this._getFeed(medias.ITUNES_MUSIC, feedType, 'all', options);
    }
    
    /**
     * Retrieves feed for iTunes U.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.itunesU();
     * //=> [...]
     */
    itunesU(options = {}) {
        return this._getFeed(medias.ITUNES_U, 'top-itunes-u-courses', 'all', options);
    }
    
    /**
     * Retrieves feed for MacOS Apps.
     * @param {string} [feedType='top-mac-apps'] The type of feed to retrieve. Must be one of: `top-free-mac-apps`, `top-grossing-mac-apps`, `top-mac-apps`, `top-paid-mac-apps`.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.macApps();
     * //=> [...]
     */
    macApps(feedType = 'top-mac-apps', options = {}) {
        return this._getFeed(medias.MAC_APPS, feedType, 'all', options);
    }
    
    /**
     * Retrieves feed for Movies.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.movies();
     * //=> [...]
     */
    movies(options = {}) {
        return this._getFeed(medias.MOVIES, 'top-movies', 'all', options);
    }
    
    /**
     * Retrieves feed for Music Videos.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.musicVideos();
     * //=> [...]
     */
    musicVideos(options = {}) {
        return this._getFeed(medias.MUSIC_VIDEOS, 'top-music-videos', 'all', options);
    }
    
    /**
     * Retrieves feed for Podcasts.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.podcasts();
     * //=> [...]
     */
    podcasts(options = {}) {
        return this._getFeed(medias.PODCASTS, 'top-podcasts', 'all', options);
    }
    
    /**
     * Retrieves feed for TV Shows.
     * @param {string} [feedType='top-tv-episodes'] The type of feed to retrieve. Must be one of: `top-tv-episodes`, `top-tv-seasons`.
     * @param {Object} [options={}] Any options from ITunesFeed to overwrite for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     * @example 
     * let feed = await itunesFeed.tvShows();
     * //=> [...]
     */
    tvShows(feedType = 'top-tv-episodes', options = {}) {
        return this._getFeed(medias.TV_SHOWS, feedType, 'all', options);
    }
    
    /**
     * Retrieves the specified feed from iTunes.
     * @private
     * @param {Object} cfg Configuration object for media type from constants.
     * @param {String} feedType The type of feed to retrieve.
     * @param {String} genre The genre to retrieve.
     * @param {Object} options Options for this request.
     * @returns {Promise<Feed>} Instance of `Feed`.
     */
    async _getFeed(cfg, feedType, genre, options) {
        let opts = this._mergeOptions(options);
        this._validateFeedType(cfg.types, feedType);
        
        let url = this._generateFeedURL(opts.countryCode, cfg.mediaType, feedType, genre, opts.limit, opts.explicit);
        
        try {
            let resp = await this._axios.get(url, opts.axiosOptions);
            return new Feed(resp.data);
        } catch(e) {
            e.url = url;
            if(e.response.status === 404) e.message = 'iTunes Feed not found. Please check your parameters.';
            
            throw e;
        }
    }
    
    /**
     * Merges and validates options.
     * @private
     * @param {Object} options Options to merge.
     * @param {Object} [defaults=this.options] Starting point to merge options into.
     * @returns {Object} The merged options object.
     */
    _mergeOptions(options, defaults) {
        let opts = Object.assign({}, defaults || this.options, options || {});
        
        if(!opts.countryCode || opts.countryCode.length !== 2 || !countries.includes(opts.countryCode)) {
            throw new Error('Invalid value for countryCode option');
        }
        
        if(!opts.limit || !limits.includes(opts.limit)) {
            throw new Error(`Invalid value for limit option, must be one of: ${limits.join(', ')}`);
        }
        
        return opts;
    }
    
    /**
     * Generates the feed URL.
     * @private
     * @param {String} countryCode
     * @param {String} mediaType
     * @param {String} feedType
     * @param {String} genre
     * @param {Number} limit
     * @param {Boolean} explicit
     * @returns {String} The generated feed url.
     */
    _generateFeedURL(countryCode, mediaType, feedType, genre, limit, explicit) {
        let file = explicit? 'explicit.json' : 'non-explicit.json';
        return `https://rss.itunes.apple.com/api/v1/${countryCode}/${mediaType}/${feedType}/${genre}/${limit}/${file}`;
    }
    
    /**
     * Validates that the correct feed type provided.
     * @private
     * @param {String[]} types Array of valid feed types to check against.
     * @param {String} type The feed type to check.
     * @returns {Boolean} True if is a valid feed type.
     */
    _validateFeedType(types, type) {
        if(!type || types.indexOf(type) === -1) {
            throw new Error(`Invalid feed type ${type}. Must be one of: ${types.join(', ')}`);
        }
        
        return true;
    }
}

module.exports = ITunesFeed;
