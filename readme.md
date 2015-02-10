min-is
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Check if a value is something

Installation
---

```sh
npm install min-is
```

Api
---

##### boolean

- `is.browser`
- `is.h5` simple modern browser detect

##### function

- `is.num` `is.number`
- `is.int`
- `is.decimal`
- `is.undef`
- `is.hash` `is.plainObject`
- `is.obj` `is.object`
- `is.fn`
- `is.str`
- `is.array`
- `is.arraylike`
- `is.empty`
- `is.element`


Merge Api
---

- `is.iod` is int or decimal
- `is.oof` is object or function
- `is.nos` is number or string


Advance
---

- `is._class`, short for `Object.prototype.toString.call(value)`
- `is._type`, short for `typeof value`

License
---

ISC

[npm-image]: https://img.shields.io/npm/v/min-is.svg?style=flat-square
[npm-url]: https://npmjs.org/package/min-is
[downloads-image]: http://img.shields.io/npm/dm/min-is.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/min-is
