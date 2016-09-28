# gemini-url-decorator

[![Build Status](https://travis-ci.org/gemini-testing/gemini-url-decorator.svg?branch=master)](https://travis-ci.org/gemini-testing/gemini-url-decorator)
[![Coverage Status](https://img.shields.io/coveralls/gemini-testing/gemini-url-decorator.svg?style=flat)](https://coveralls.io/r/gemini-testing/gemini-url-decorator?branch=master)

Plugin for [gemini](https://github.com/gemini-testing/gemini) which is intended to change test urls in runtime. You can read more about plugins at [documentation](https://github.com/gemini-testing/gemini/blob/master/doc/plugins.md).

## Installation

```bash
npm install gemini-url-decorator
```

## Usage

### Configuration

* **url** (optional) `Object` - the list of url parameters, which will be added in each test url
    * **query** (optional) `Object` - the list of query parameters
        * **queryParam** (optional) `Object` - name of query parameter
            * **value** (optional) `String` - value of query parameter
            * **concat** (optional) `Boolean` - enable/disable concatenation; by default is `true`

### Examples

Add plugin to your `gemini` config file:

```yaml
system:
  plugins:
    url-decorator: true
```

To pass additional url parameters you can use environment variables, which should start with `GEMINI_URL_` or specify them in the `gemini` config file.

For example, you have the following test url: `http://localhost/test/?name=bilbo` and you want to add query parameter via environment variable:

```bash
GEMINI_URL_QUERY_TEXT=ololo gemini test
```

After that your test url will be changed to: `http://localhost/test/?name=bilbo&text=ololo`.

The same thing you can do using `gemini` config file:

```yaml
url-decorator:
  url:
    query:
      text:
        value: ololo
      # or
      text: ololo
```

Note: environment variables have higher priority than config values.

#### Concatenation of url parameters

In previous example you have seen how add url parameters. Now we look how to concat and override url parameters.

Suppose, you want to add query parameter `name` which is already presented in your test url: `http://localhost/test/?name=bilbo` and you don't want to override it:

```yaml
url-decorator:
  url:
    query:
      name:
        value: torin
        concat: true
      # or
      name:
        value: torin
      # or
      name: torin

```

The result url will look like: `http://localhost/test/?name=bilbo&name=torin`. How you understand, the result will be the same if `concat` would be any value except `false`.

Moreover for previous test url you can specify a set of values for one query parameter:

```yaml
url-decorator:
  url:
    query:
      name:
        value:
          - torin
          - gloin
      # or
      name:
        - torin
        - gloin
```

The result url will look like: `http://localhost/test/?name=bilbo&name=torin&name=gloin`

If you want to override value of `name` query parameter:

```yaml
url-decorator:
  url:
    query:
      name:
        value: torin
        concat: false
```

As a result url will look like: `http://localhost/test/?name=torin`.

You can do the same thing via environment variables. In this case concat value will be used from config to the same url parameter:

```bash
GEMINI_URL_QUERY_NAME=gloin gemini test
```

The result url will look like: `http://localhost/test/?name=gloin`
