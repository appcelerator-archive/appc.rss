var Arrow = require('arrow')

exports.model = Arrow.Model.extend('tbray', {
  fields: {
    title: {type: String},
    author: {type: String},
    summary: {type: String},
    published: {name: 'pubdate', type: Date}
  },
  config: {
    url: 'http://www.tbray.org/ongoing/ongoing.atom'
  }
})
