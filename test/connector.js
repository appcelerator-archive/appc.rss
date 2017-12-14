var should = require('should'),
  base = require('./_base'),
  Arrow = base.Arrow,
  server = base.server,
  connector = base.connector

describe('Connector', function () {
  it('should require a minimum version of Arrow', function () {
    var mockConnector = {
      Capabilities: {},
      extend: function () {}
    }

    should(function () {
      require('../lib/index').create({
        Connector: mockConnector
      })
    }).throw()
    should(function () {
      require('../lib/index').create({
        Version: '1.2.0',
        Connector: mockConnector
      })
    }).throw()
    should(function () {
      require('../lib/index').create({
        Version: '1.5.0',
        Connector: mockConnector
      })
    }).not.throw()
  })

  it('should handle bad atom feeds', function (next) {
    var Model = Arrow.Model.extend('foo', {
      fields: {
        title: {type: String},
        author: {type: String},
        summary: {type: String},
        published: {name: 'pubdate', type: Date}
      },
      config: {
        url: 'http://www.appcelerator.com/'
      },
      connector: connector
    })
    Model.findAll()
    Model.findAll(function (err, results) {
      should(err).be.ok
      next()
    })
  })

  it('should handle urls that do not exist', function (next) {
    var Model = Arrow.Model.extend('foo', {
      fields: {
        title: {type: String},
        author: {type: String},
        summary: {type: String},
        published: {name: 'pubdate', type: Date}
      },
      config: {
        url: 'http://www.tbray.org/ongoing/ongoing.atomz'
      },
      connector: connector
    })
    Model.findAll()
    Model.findAll(function (err, results) {
      should(err).be.ok
      next()
    })
  })

  it('should handle urls that do not exist', function (next) {
    var Model = Arrow.Model.extend('foo', {
      fields: {
        title: {type: String},
        author: {type: String},
        summary: {type: String},
        published: {name: 'pubdate', type: Date}
      },
      config: {
        url: 'http://localhost:1337/this/does/not/exist'
      },
      connector: connector
    })
    Model.findAll()
    Model.findAll(function (err, results) {
      should(err).be.ok
      next()
    })
  })

  it('should handle good url caching', function (next) {
    var Model = Arrow.Model.extend('foo', {
      fields: {
        title: {type: String},
        author: {type: String},
        summary: {type: String},
        published: {name: 'pubdate', type: Date}
      },
      config: {
        url: 'http://www.tbray.org/ongoing/ongoing.atom'
      },
      connector: connector
    })
    Model.findAll()
    Model.findAll()
    Model.findAll(function (err, results) {
      should(err).be.ok
      next()
    })
  })
})
