# express-ua

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

## Print YUI style userAgent info on html & req.ua
## Classify browser type by modern/mobile/obsolete

## Usage

for express middleware:
```
	...
	app.use(require('express-ua'))
	...
	app.use(function(req, res, next){
		console.log(req.ua)
	})
	...

```

for jade template:
```
	html(class="#{ua&&ua.join(' ')||''}")
	<!-- <html class="ua-ie ua-ie11 ua-win"> -->
```


## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/express-ua.svg?style=flat
[npm-url]: https://npmjs.org/package/express-ua
[travis-image]: https://travis-ci.org/cutsin/express-ua.svg
[travis-url]: https://travis-ci.org/cutsin/express-ua
[coveralls-image]: https://img.shields.io/coveralls/cutsin/express-ua.svg?style=flat
[coveralls-url]: https://coveralls.io/r/cutsin/express-ua
[downloads-image]: https://img.shields.io/npm/dm/express-ua.svg?style=flat
[downloads-url]: https://npmjs.org/package/express-ua
