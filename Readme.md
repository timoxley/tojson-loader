# tojson-loader

## Cache module.exports as JSON.

* Removes need to ship dependencies to the client.
* Avoids cost of generating data at run-time.
* Allows you to depend on compile-time-only data and dependencies e.g. calls to `fs` or `crypto`

Useful for doing things like loading config or mock data into client.

Note serialisation to JSON means only supports JSON data types i.e. Can't serialise Functions or Date objects.

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

// any other dependencies that are only used in here won't be included in bundle

// whatever the value of module.exports is will be serialised to JSON
module.exports = fs.readFileSync(__dirname + '/../../Readme.md', 'utf8')
```

## License

ISC
