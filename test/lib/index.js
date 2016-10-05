'use strict';

const EventEmitter = require('events').EventEmitter;
const proxyquire = require('proxyquire');

const mkGemini_ = () => {
    const emitter = new EventEmitter();
    emitter.events = {
        BEGIN_SUITE: 'beginSuite'
    };

    return emitter;
};

describe('gemini-url-decorator', () => {
    const sandbox = sinon.sandbox.create();

    let plugin;
    let gemini;
    let initConfig;
    let decorateUrl;

    beforeEach(() => {
        initConfig = sandbox.stub();
        decorateUrl = sandbox.stub();

        gemini = mkGemini_();
        sandbox.spy(gemini, 'on');

        plugin = proxyquire('../../lib', {
            './config': initConfig,
            './url-decorator': decorateUrl
        });
    });

    afterEach(() => sandbox.restore());

    it('should do nothing if "opts" is not an object', () => {
        plugin(gemini, null);

        assert.notCalled(gemini.on);
    });

    it('should pass data emitted by gemini to url decorator', () => {
        const data = sinon.spy.named('data');

        plugin(gemini, {});
        gemini.emit(gemini.events.BEGIN_SUITE, data);

        assert.calledWithMatch(decorateUrl, data);
    });

    it('should pass url config to url decorator', () => {
        const configUrl = {query: {text: 'hello'}};
        const expectedConfig = {query: {text: {value: 'hello', concat: true}}};

        initConfig.withArgs(configUrl, process.env).returns(expectedConfig);

        plugin(gemini, {url: configUrl});
        gemini.emit(gemini.events.BEGIN_SUITE);

        assert.calledWithMatch(decorateUrl, sinon.match.any, expectedConfig);
    });
});
