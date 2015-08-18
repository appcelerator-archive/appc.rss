module.exports = {
	connectors: {
		'appc.rss': {
			// TODO: You can specify configuration values for your connector here!

			url: '',

			// Create models based on your schema that can be used in your API.
			generateModelsFromSchema: true,

			// Whether or not to generate APIs based on the methods in generated models. 
			modelAutogen: false

		}
	}
};