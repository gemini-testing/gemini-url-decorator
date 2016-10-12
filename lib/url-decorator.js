'use strict';

const Url = require('./url');

const updateUri = (uri, config) => {
    return new Url(uri)
        .updateQuery(config.query)
        .format();
};

const isRootSuite = (suite) => suite.hasOwnProperty('url');

module.exports = (data, config) => {
    if (!isRootSuite(data.suite)) {
        return;
    }

    const suite = data.suite;
    suite.url = updateUri(suite.url, config);
};
