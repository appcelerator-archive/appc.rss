var Arrow = require('arrow'),
	FeedParser = require('feedparser'),
	request = require('request'),
	LRUCache = require('lru-native');

var cache = new LRUCache({
	// The maximum number of items to add to the cache before evicting the least-recently-used item.
	// Default: 0, meaning there is no maximum.
	maxElements: 10000,

	// The maximum age (in milliseconds) of an item.
	// The item will be removed if get() is called and the item is too old.
	// Default: 0, meaning items will never expire.
	maxAge: 60000,

	// The initial number of items for which space should be allocated.
	// The cache will resize dynamically if necessary.
	size: 1000
});

/**
 * Finds all RSS feed items.
 * @param Model
 * @param next
 */
exports.findAll = function (Model, next) {
	var feedParser = new FeedParser(),
		articles = [];

	var value = cache.get(Model.config.url);
	if (value) {
		next(null, new Arrow.Collection(Model, value));
		return;
	}

	request(Model.config.url)
		.on('response', function (res) {
			if (res.statusCode !== 200) {
				this.emit('error', new Error('Bad status code'));
			}
			else {
				this.pipe(feedParser);
			}
		})
		.on('error', function (error) {
			if (next) {
				next(error);
				next = null;
			}
		});

	feedParser
		.on('error', function (error) {
			if (next) {
				next(error);
				next = null;
			}
		})
		.on('readable', function () {
			var stream = this,
				item = stream.read();

			while (item) {
				var instance = Model.instance(item, true);
				instance.setPrimaryKey(item.link);
				articles.push(instance);
				item = stream.read();
			}
		})
		.on('end', function () {
			cache.set(Model.config.url, articles);
			next(null, new Arrow.Collection(Model, articles));
			next = null;
		});

};