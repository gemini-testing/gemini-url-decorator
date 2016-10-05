'use strict';

const Url = require('../../lib/url');

describe('url', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => sandbox.restore());

    describe('updateQuery', () => {
        it('should be chainable', () => {
            const url = new Url('http://localhost/?query');

            assert.equal(url.updateQuery({}), url);
        });
    });
});
