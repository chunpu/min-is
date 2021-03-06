var is = exports

var obj = Object.prototype

var navigator = global.navigator

// reserved words in es3: instanceof null undefined arguments boolean false true function int
// only have is.string and is.object, not is.str and is.obj
// instanceof null undefined arguments boolean false true function int

is.browser = function() {
	if (!is.wechatApp()) {
		if (navigator && global.window == global) {
			return true
		}
	}
	return false
}

// simple modern browser detect
is.h5 = function() {
	if (is.browser() && navigator.geolocation) {
		return true
	}
	return false
}

is.mobile = function() {
	if (is.browser() && /mobile/i.test(navigator.userAgent)) {
		return true
	}
	return false
}

is.wechatApp = function() {
	if ('object' == typeof wx) {
		if (wx && is.fn(wx.createVideoContext)) {
			// wechat js sdk has no createVideoContext
			return true
		}
	}
	return false
}

function _class(val) {
	var name = obj.toString.call(val)
	// [object Class]
	return name.substring(8, name.length - 1).toLowerCase()
}

function _type(val) {
	// undefined object boolean number string symbol function
	return typeof val
}

function owns(owner, key) {
	return obj.hasOwnProperty.call(owner, key)
}

is._class = _class

is._type = _type

is.owns = owns

// not a number
is.nan = function(val) {
	return val !== val
}

is.bool = function(val) {
	return 'boolean' == _class(val)
}

is.infinite = function(val) {
	return val == Infinity || val == -Infinity
}

is.number = function(num) {
	return !isNaN(num) && 'number' == _class(num)
}

// integer or decimal
is.iod = function(val) {
	if (is.number(val) && !is.infinite(val)) {
		return true
	}
	return false
}

is.decimal = function(val) {
	if (is.iod(val)) {
		return 0 != val % 1
	}
	return false
}

is.integer = function(val) {
	if (is.iod(val)) {
		return 0 == val % 1
	}
	return false
}

// object or function
is.oof = function(val) {
	if (val) {
		var tp = _type(val)
		return 'object' == tp || 'function' == tp
	}
	return false
}

// regexp should return object
is.object = function(obj) {
	return is.oof(obj) && 'function' != _class(obj)
}

is.hash = is.plainObject = function(hash) {
	if (hash) {
		if ('object' == _class(hash)) {
			// old window is object
			if (hash.nodeType || hash.setInterval) {
				return false
			}
			return true
		}
	}
	return false
}

is.undef = function(val) {
	return 'undefined' == _type(val)
}

// host function should return function, e.g. alert
is.fn = function(fn) {
	return 'function' == _class(fn)
}

is.string = function(str) {
	return 'string' == _class(str)
}

// number or string
is.nos = function(val) {
	return is.iod(val) || is.string(val)
}

is.array = function(arr) {
	return 'array' == _class(arr)
}

is.arraylike = function(arr) {
	// window has length for iframe too, but it is not arraylike
	if (!is.window(arr) && is.object(arr)) {
		var len = arr.length
		if (is.integer(len) && len >= 0) {
			return true
		}
	}
	return false
}

is.window = function(val) {
	if (val && val.window == val) {
		return true
	}
	return false
}

is.empty = function(val) {
	if (is.string(val) || is.arraylike(val)) {
		return 0 === val.length
	}
	if (is.hash(val)) {
		for (var key in val) {
			if (owns(val, key)) {
				return false
			}
		}
	}
	return true
}

is.element = function(elem) {
	if (elem && 1 === elem.nodeType) {
		return true
	}
	return false
}

is.regexp = function(val) {
	return 'regexp' == _class(val)
}

