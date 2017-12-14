var Arrow = require('arrow'),
  FeedParser = require('feedparser'),
  request = require('request')

/**
 * Finds all RSS feed items.
 * @param Model
 * @param next
 */
exports.findAll = function (Model, next) {
  var cached = this.cache().get(Model.config.url)
  if (cached) {
    if (next) {
      next(null, new Arrow.Collection(Model, cached))
    }
    return
  }

  var self = this,
    feedParser = new FeedParser(),
    articles = []

  request(Model.config.url)
		.on('response', function (res) {
  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'))
  } else {
    this.pipe(feedParser)
  }
})
		.on('error', function (error) {
  if (next) {
    next(error)
    next = null
  }
})

  feedParser
		.on('error', function (error) {
  if (next) {
    next(error)
    next = null
  }
})
		.on('readable', function () {
  var stream = this,
    item = stream.read()

  while (item) {
    var instance = Model.instance(item, true)
    instance.setPrimaryKey(item.link)
    articles.push(instance)
    item = stream.read()
  }
})
		.on('end', function () {
  self.cache().set(Model.config.url, articles)
  if (next) {
    next(null, new Arrow.Collection(Model, articles))
    next = null
  }
})
}
