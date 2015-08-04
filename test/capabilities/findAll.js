var should = require('should');

exports.findAll = {
	iterations: 5, // To run this test multiple times (useful when you're caching results), increase this number.
	check: function (results) {
		should(results.length).be.above(0);
		for (var i = 0; i < results.length; i++) {
			var result = results[i];
			should(result.title).be.ok;
			should(result.author).be.ok;
			should(result.summary).be.ok;
			should(result.published).be.ok;
		}
	}
};
