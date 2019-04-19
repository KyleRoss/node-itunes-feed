/**
 * @module itunes-feed
 * @return {ITunesFeed} Instance of ITunesFeed.
 * @example 
 * // Basic usage
 * const itunesFeed = require('itunes-feed');
 * 
 * // Advanced usage
 * const ITunesFeed = require('itunes-feed').ITunesFeed;
 * const itunesFeed = new ITunesFeed({
 *     // options...
 * });
 */
"use strict";
const ITunesFeed = require('./lib/ITunesFeed');

module.exports = new ITunesFeed();
