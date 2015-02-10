var is = exports

var obj = Object.prototype

is.browser = (function() {
	return global.window == global
})()

is._class = function(val) {
	var name = obj.toString.call(val)
	// [object Class]
	return name.substring(8, name.length - 1).toLowerCase()
}

is._type = function(val) {
	// undefined object boolean number string symbol function
	return typeof val
}

// not a number
is.nan = function(val) {
	return !is.num(val)
}

is.infinite = function(val) {
	return val == Infinity || val == -Infinity
}

is.num = is.number = function(num) {
	return !isNaN(num) && 'number' == is._class(num)
}

// int or decimal
is.iod = function(val) {
	if (is.num(val) && !is.infinite(val)) {
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

is.int = function(val) {
	if (is.iod(val)) {
		return 0 == val % 1
	}
	return false
}

// object or function
is.oof = function(val) {
	if (val) {
		var tp = is._type(val)
		return 'object' == tp || 'function' == tp
	}
	return false
}

// regexp should return object
is.obj = is.object = function(obj) {
	return is.oof(obj) && 'function' != is._class(obj)
}

is.hash = is.plainObject = function(hash) {
	if (hash) {
		if ('object' == is._class(hash)) {
			// old window is object
			if (hash.nodeType || hash.setInterval) {
				return false
			}
			return true
		}
	}
	return false
}

// host function should return function, e.g. alert
is.fn = function(fn) {
	return 'function' == is._class(fn)
}

is.str = is.string = function(str) {
	return 'string' == is._class(str)
}

// number or string
is.nos = function(val) {
	return is.iod(val) || is.str(val)
}

is.array = function(arr) {
	return 'array' == is._class(arr)
}

is.arraylike = function(arr) {
	if (is.obj(arr)) {
		if (arr.hasOwnProperty('length')) {
			var len = arr.length
			if (is.int(len) && len >= 0) {
				return true
			}
		}
	}
	return false
}

is.empty = function(val) {
	if (is.str(val) || is.arraylike(val)) {
		return 0 === val.length
	}
	// TODO comfirm
	if (is.hash(val)) {
		for (var key in val) {
			if (val.hasOwnProperty(key)) {
				return false
			}
		}
	}
	return true
}

is.element = function(elem) {
	if (is.obj(elem) && 1 === elem.nodeType) {
		return /element/.test(is._class(elem))
	}
	return false
}
