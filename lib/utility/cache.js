var LRU = require('lru-cache'),
	Cache = LRU({
		max: 500,
		maxAge: 10 * 60 * 1000 /* 10 minutes */
	});

exports.cache = function cache() {
	return Cache;
};
