# tojson-loader

[![NPM](https://nodei.co/npm/tojson-loader.png)](https://nodei.co/npm/tojson-loader/)
[![NPM](https://nodei.co/npm-dl/tojson-loader.png?months=3&height=2)](https://nodei.co/npm/tojson-loader/)

### Generate JSON assets at build-time

[![Build Status](https://travis-ci.org/timoxley/tojson-loader.png?branch=master)](https://travis-ci.org/timoxley/tojson-loader)

If every client needs access to a shared chunk of data, and that data
can be known at build time, a simple option is to bake that data into
clientside build with `tojson-loader`.

#### Benefits

* Having shared, static data preloaded in the client can improve performance/UX & reduce complexity.
* Use whatever tools you need to generate the data on the serverside, no need to worry about shipping or shimming them on the client.
* Reduce client-side processing load. Perform expensive calulations only once, on the server, at build-time.
* Designed so tojson scripts can be transparently universal. Will run dynamic version on server & load static version on client.

Particularly useful for loading configuration and/or mock data into the client.

### Caveats

* Only supports JSON data types i.e. JSON can't natively serialise `Function` or `Date` objects.

## Usage

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    loaders: [
      {
        // Use *.json.js extension to bake exported JS data into JSON
        test: /\.json\.js/,
        loader: 'tojson'
      }
      ...
    ]
  }
}
```

### Example `.json.js` file

```js
// data.json.js

// can use serverside-only dependencies
var fs = require('fs')
var readme = fs.readFileSync(__dirname + '/../../Readme.md', 'utf8')
readme = readme.split('\n')[0] // (just grab header for demo)

// any other dependencies that are only used in here won't be included in bundle
var tape = require('tape') // some random dependency

// whatever the value of module.exports is will be serialised to JSON
module.exports = {
  readme: readme,
  tape: tape, // tape happens to be a function so it won't serialise.
  random: Math.random(), // will be fixed to whatever value is generated at compile-time
}
```

```js
// index.js
console.log(require('./data.json.js'))
```

#### Example Result

The transformed output after being built by webpack is below.

Note:

* No dependencies on any of the modules (`fs`, `tape`) used.
* Result of `fs.readFileSync` is baked into the output.
* `random` key will always be the same value until next build.
* `tape` key doesn't exist because JSON can't serialise functions.

```js
...
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	console.log(__webpack_require__(1))


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {"readme":"# tojson-loader","random":0.5418716457206756}

/***/ }
/******/ ]);
```



## License

ISC
