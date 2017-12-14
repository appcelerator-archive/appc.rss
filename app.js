/**
 * NOTE: This file is simply for testing this connector and will not
 * be used or packaged with the actual connector when published.
 */
var Arrow = require('arrow'),
  server = new Arrow()

server.addModel(Arrow.Model.extend('tbray', {
  fields: {
    title: {type: String},
    author: {type: String},
    summary: {type: String},
    published: {name: 'pubdate', type: Date}
  },
  config: {
    url: 'http://www.tbray.org/ongoing/ongoing.atom'
  },
  connector: 'appc.rss'
}))

server.start()
