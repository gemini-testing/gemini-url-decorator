'use strict';

const _ = require('lodash');
const decorateUrl = require('./url-decorator');
const initConfig = require('./config').init;

module.exports = (gemini, opts) => {
    if (!_.isObject(opts)) {
        return;
    }

    const config = initConfig(opts.url, process.env);

    gemini.on(gemini.events.BEGIN_SUITE, (data) => decorateUrl(data, config));
};
