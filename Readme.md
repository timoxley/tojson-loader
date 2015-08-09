# tojson-loader

#### Serialize module exports as JSON.

Cache generated static data as JSON at build time.

* Removes need to ship dependencies to the client.
* Avoids cost of generating data at run-time.
* Allows you to depend on compile-time-only data and dependencies e.g. calls to `fs` or `crypto`

Useful for doing things like loading config or mock data into client.

Note serialisation to JSON means only supports JSON data types i.e. Can't serialise Functions or Date objects.

## Example

This is an excerpt from the [test](https://github.com/timoxley/tojson-loader/tree/master/test) directory.

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

#### Result

The transformed output after being built by webpack is below.

Note:

* No dependencies on any of the modules used.
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
