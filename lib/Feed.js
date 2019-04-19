"use strict";
/**
 * @external Array
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */

/**
 * Data wrapper for feed responses. Returns an array of results from the feed with additional properties 
 * available on the prototype.
 * @extends {external:Array}
 * @typicalname feed
 */
class Feed extends Array {
    constructor({ feed }) {
        super(...feed.results);
        this._feed = feed;
    }
    
    /**
     * The title of the feed.
     * @readonly
     * @type {String}
     */
    get title() {
        return this._feed.title;
    }
    
    /**
     * The url of the feed.
     * @readonly
     * @type {String}
     */
    get url() {
        return this._feed.id;
    }
    
    /**
     * The country code in which this feed is for.
     * @readonly
     * @type {String}
     */
    get countryCode() {
        return this._feed.country;
    }
    
    /**
     * The date when this feed was last updated.
     * @readonly
     * @type {Date}
     */
    get updated() {
        return new Date(this._feed.updated);
    }
}

module.exports = Feed;
