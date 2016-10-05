'use strict';

const decorateUrl = require('../../lib/url-decorator');

describe('url-decorator', () => {
    it('should skip url decoration if suite url is not defined', () => {
        const suite = {url: undefined};

        decorateUrl({suite});

        assert.doesNotChange(() => decorateUrl({suite}), suite, 'url');
    });

    it('should add new parameters if they do not exist in url', () => {
        const suite = {url: '/?text=text'};

        decorateUrl({suite}, {query: {foo: {value: 'bar'}, baz: {value: 'boo'}}});

        assert.equal(suite.url, '/?text=text&foo=bar&baz=boo');
    });

    describe('should concat parameters', () => {
        it('by default', () => {
            const suite = {url: '/?text=text'};

            decorateUrl({suite}, {query: {text: {value: 'foo'}}});

            assert.equal(suite.url, '/?text=text&text=foo');
        });

        it('if "concat" is true', () => {
            const suite = {url: '/?text=text'};

            decorateUrl({suite}, {query: {text: {value: 'foo', concat: true}}});

            assert.equal(suite.url, '/?text=text&text=foo');
        });

        it('specified as number', () => {
            const suite = {url: '/?text=text'};

            decorateUrl({suite}, {query: {text: {value: 15}}});

            assert.equal(suite.url, '/?text=text&text=15');
        });

        it('from array of values', () => {
            const suite = {url: '/?text=text'};

            decorateUrl({suite}, {query: {text: {value: ['foo', 'bar']}}});

            assert.equal(suite.url, '/?text=text&text=foo&text=bar');
        });
    });

    it('should override parameters if "concat" is false', () => {
        const suite = {url: '/?text=text'};

        decorateUrl({suite}, {query: {text: {value: 'foo', concat: false}}});

        assert.equal(suite.url, '/?text=foo');
    });

    describe('should not add url parameters', () => {
        it('if they are specified as an empty object', () => {
            const suite = {url: '/?text=text'};

            decorateUrl({suite}, {query: {text: {}}});

            assert.equal(suite.url, '/?text=text');
        });

        it('if they are specified as an object without "value" field', () => {
            const suite = {url: '/?text=text'};

            decorateUrl({suite}, {query: {text: {concat: false}}});

            assert.equal(suite.url, '/?text=text');
        });

        it('if they are specified as an empty string', () => {
            const suite = {url: '/?text=text'};

            decorateUrl({suite}, {query: {name: {value: ''}}});

            assert.equal(suite.url, '/?text=text');
        });

        it('if they are specified as an empty array', () => {
            const suite = {url: '/?text=text'};

            decorateUrl({suite}, {query: {name: {value: []}}});

            assert.equal(suite.url, '/?text=text');
        });
    });
});
