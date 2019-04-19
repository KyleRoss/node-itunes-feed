# itunes-feed
[![npm](https://img.shields.io/npm/v/itunes-feed.svg?style=for-the-badge)](https://www.npmjs.com/package/itunes-feed)
[![npm](https://img.shields.io/npm/dt/itunes-feed.svg?style=for-the-badge)](https://www.npmjs.com/package/itunes-feed)
[![David](https://img.shields.io/david/KyleRoss/node-itunes-feed.svg?style=for-the-badge)](https://david-dm.org/KyleRoss/node-itunes-feed)
[![Travis](https://img.shields.io/travis/KyleRoss/node-itunes-feed/master.svg?style=for-the-badge)](https://travis-ci.org/KyleRoss/node-itunes-feed)
[![Coveralls](https://img.shields.io/coveralls/github/KyleRoss/node-itunes-feed.svg?style=for-the-badge)](https://coveralls.io/github/KyleRoss/node-itunes-feed)
[![license](https://img.shields.io/github/license/KyleRoss/node-itunes-feed.svg?style=for-the-badge)](https://github.com/KyleRoss/node-itunes-feed/blob/master/LICENSE)
[![Beerpay](https://img.shields.io/beerpay/KyleRoss/node-itunes-feed.svg?style=for-the-badge)](https://beerpay.io/KyleRoss/node-itunes-feed)

Generates and retrieves JSON feeds from iTunes for various different services. A programmatic version of the [RSS Feed Generator](https://rss.itunes.apple.com/en-us).

# Usage
## Install
```
npm install --save itunes-feed
```

## Example
```js
const itunesFeed = require('itunes-feed');

// ...

try {
    let feed = await itunesFeed.appleMusic();
    console.log(`Retrieved ${feed.length} items for Apple Music`);
    
    // ...
} catch(error) {
    console.error(error);
}
```

# API Documentation
<a name="module_itunes-feed"></a>

## itunes-feed ⇒ [<code>ITunesFeed</code>](#ITunesFeed)
**Returns**: [<code>ITunesFeed</code>](#ITunesFeed) - Instance of ITunesFeed.  
**Example**  
```js
// Basic usage
const itunesFeed = require('itunes-feed');

// Advanced usage
const ITunesFeed = require('itunes-feed').ITunesFeed;
const itunesFeed = new ITunesFeed({
    // options...
});
```
<a name="ITunesFeed"></a>

## ITunesFeed
Class exported from itunes-feed.

**Kind**: global class  

* [ITunesFeed](#ITunesFeed)
    * [new ITunesFeed([options])](#new_ITunesFeed_new)
    * [itunesFeed.ITunesFeed](#ITunesFeed+ITunesFeed) : [<code>ITunesFeed</code>](#ITunesFeed)
    * [itunesFeed.options](#ITunesFeed+options) : <code>Object</code>
    * [itunesFeed.appleMusic([feedType], [options])](#ITunesFeed+appleMusic) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.audioBooks([options])](#ITunesFeed+audioBooks) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.books([feedType], [options])](#ITunesFeed+books) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.iosApps([feedType], [genre], [options])](#ITunesFeed+iosApps) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.itunesMusic([feedType], [options])](#ITunesFeed+itunesMusic) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.itunesU([options])](#ITunesFeed+itunesU) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.macApps([feedType], [options])](#ITunesFeed+macApps) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.movies([options])](#ITunesFeed+movies) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.musicVideos([options])](#ITunesFeed+musicVideos) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.podcasts([options])](#ITunesFeed+podcasts) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
    * [itunesFeed.tvShows([feedType], [options])](#ITunesFeed+tvShows) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)

<a name="new_ITunesFeed_new"></a>

### new ITunesFeed([options])
Creates a new instance of ITunesFeed.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object for configuring ITunesFeed. These options can be set on the instance (`this.options`). |
| [options.countryCode] | <code>String</code> | <code>&#x27;us&#x27;</code> | 2 letter country code to use for all requests. Must be lowercase. |
| [options.limit] | <code>Number</code> | <code>100</code> | Limit of items returned in a feed. Must be one of: `10`, `25`, `50` or `100`. Any other value will throw an error. |
| [options.explicit] | <code>Boolean</code> | <code>true</code> | Whether to include explicit results. |
| [options.axiosOptions] | <code>Object</code> |  | Object containing additional options to pass to [axios](https://github.com/axios/axios#request-config). |

<a name="ITunesFeed+ITunesFeed"></a>

### itunesFeed.ITunesFeed : [<code>ITunesFeed</code>](#ITunesFeed)
Access to uninstantiated ITunesFeed class for advanced usage.

**Kind**: instance property of [<code>ITunesFeed</code>](#ITunesFeed)  
**Read only**: true  
<a name="ITunesFeed+options"></a>

### itunesFeed.options : <code>Object</code>
Global options set on this instance. You may change these options at any time.

**Kind**: instance property of [<code>ITunesFeed</code>](#ITunesFeed)  
**Example**  
```js
itunesFeed.options.limit = 50;
```
<a name="ITunesFeed+appleMusic"></a>

### itunesFeed.appleMusic([feedType], [options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for Apple Music.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [feedType] | <code>String</code> | <code>&#x27;top-songs&#x27;</code> | The type of feed to retrieve. Must be one of: `coming-soon`, `hot-tracks`, `new-releases`, `top-albums`, `top-songs`. |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.appleMusic();
//=> [...]

let feed = await itunesFeed.appleMusic('hot-tracks', {
    explicit: false
});
```
<a name="ITunesFeed+audioBooks"></a>

### itunesFeed.audioBooks([options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for Audiobooks.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.audioBooks();
//=> [...]
```
<a name="ITunesFeed+books"></a>

### itunesFeed.books([feedType], [options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for Books.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [feedType] | <code>string</code> | <code>&quot;&#x27;top-free&#x27;&quot;</code> | The type of feed to retrieve. Must be one of: `top-free`, `top-paid`. |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.books();
//=> [...]
```
<a name="ITunesFeed+iosApps"></a>

### itunesFeed.iosApps([feedType], [genre], [options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for iOS Apps.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  
**Throws**:

- <code>Error</code> If an invalid genre is provided.
- <code>Error</code> If the genre is set to `games` on a feed type that is not `top-free` or `top-paid`.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [feedType] | <code>string</code> | <code>&quot;&#x27;top-free&#x27;&quot;</code> | The type of feed to retrieve. Must be one of: `new-apps-we-love`, `new-games-we-love`, `top-free`, `top-free-ipad`, `top-grossing`, `top-grossing-ipad`, `top-paid`. |
| [genre] | <code>string</code> | <code>&quot;&#x27;all&#x27;&quot;</code> | Optional genre to retrieve. The only available genres are `all` and `games`. The `games` genre is only available on `top-free` and `top-paid` feed types. |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.iosApps();
//=> [...]

let feed = await itunesFeed.iosApps('top-paid', 'games');
```
<a name="ITunesFeed+itunesMusic"></a>

### itunesFeed.itunesMusic([feedType], [options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for iTunes Music.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [feedType] | <code>string</code> | <code>&quot;&#x27;top-songs&#x27;&quot;</code> | The type of feed to retrieve. Must be one of: `new-music`, `recent-releases`, `top-albums`, `top-songs`. |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.itunesMusic();
//=> [...]
```
<a name="ITunesFeed+itunesU"></a>

### itunesFeed.itunesU([options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for iTunes U.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.itunesU();
//=> [...]
```
<a name="ITunesFeed+macApps"></a>

### itunesFeed.macApps([feedType], [options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for MacOS Apps.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [feedType] | <code>string</code> | <code>&quot;&#x27;top-mac-apps&#x27;&quot;</code> | The type of feed to retrieve. Must be one of: `top-free-mac-apps`, `top-grossing-mac-apps`, `top-mac-apps`, `top-paid-mac-apps`. |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.macApps();
//=> [...]
```
<a name="ITunesFeed+movies"></a>

### itunesFeed.movies([options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for Movies.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.movies();
//=> [...]
```
<a name="ITunesFeed+musicVideos"></a>

### itunesFeed.musicVideos([options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for Music Videos.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.musicVideos();
//=> [...]
```
<a name="ITunesFeed+podcasts"></a>

### itunesFeed.podcasts([options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for Podcasts.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.podcasts();
//=> [...]
```
<a name="ITunesFeed+tvShows"></a>

### itunesFeed.tvShows([feedType], [options]) ⇒ [<code>Promise.&lt;Feed&gt;</code>](#Feed)
Retrieves feed for TV Shows.

**Kind**: instance method of [<code>ITunesFeed</code>](#ITunesFeed)  
**Returns**: [<code>Promise.&lt;Feed&gt;</code>](#Feed) - Instance of `Feed`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [feedType] | <code>string</code> | <code>&quot;&#x27;top-tv-episodes&#x27;&quot;</code> | The type of feed to retrieve. Must be one of: `top-tv-episodes`, `top-tv-seasons`. |
| [options] | <code>Object</code> | <code>{}</code> | Any options from ITunesFeed to overwrite for this request. |

**Example**  
```js
let feed = await itunesFeed.tvShows();
//=> [...]
```
<a name="Feed"></a>

## Feed ⇐ [<code>Array</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
Data wrapper for feed responses. Returns an array of results from the feed with additional properties 
available on the prototype.

**Kind**: global class  
**Extends**: [<code>Array</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)  

* [Feed](#Feed) ⇐ [<code>Array</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
    * [feed.title](#Feed+title) : <code>String</code>
    * [feed.url](#Feed+url) : <code>String</code>
    * [feed.countryCode](#Feed+countryCode) : <code>String</code>
    * [feed.updated](#Feed+updated) : <code>Date</code>

<a name="Feed+title"></a>

### feed.title : <code>String</code>
The title of the feed.

**Kind**: instance property of [<code>Feed</code>](#Feed)  
**Read only**: true  
<a name="Feed+url"></a>

### feed.url : <code>String</code>
The url of the feed.

**Kind**: instance property of [<code>Feed</code>](#Feed)  
**Read only**: true  
<a name="Feed+countryCode"></a>

### feed.countryCode : <code>String</code>
The country code in which this feed is for.

**Kind**: instance property of [<code>Feed</code>](#Feed)  
**Read only**: true  
<a name="Feed+updated"></a>

### feed.updated : <code>Date</code>
The date when this feed was last updated.

**Kind**: instance property of [<code>Feed</code>](#Feed)  
**Read only**: true  
## Tests
To run tests locally, clone this repo and run:

```
npm test
```

## License
MIT License
