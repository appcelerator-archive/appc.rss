var should = require('should'),
	Arrow = require('arrow'),
	server = new Arrow(),
	connector = server.getConnector('appc.rss');

describe('Connector Capabilities', Arrow.Connector.generateTests(connector, module));
