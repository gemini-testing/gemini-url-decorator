'use strict';

const Url = require('./url');

const updateUri = (uri, config) => {
    return new Url(uri)
        .updateQuery(config.query)
        .format();
};

module.exports = (data, config) => {
    if (!data.suite.url) {
        return;
    }

    const suite = data.suite;
    suite.url = updateUri(suite.url, config);
};
