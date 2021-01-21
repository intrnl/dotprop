function split (str) {
	let parts = str.split('.');

	for (let idx = 0; idx < parts.length; idx++) {
		let part = parts[idx];

		while (part.endsWith('\\')) {
			part = `${part.slice(0, -1)}.${parts[idx + 1]}`;
			parts.splice(idx, 2, part);
		}
	}

	return parts;
}

function is_object (value) {
	return value && typeof value === 'object';
}


module.exports.get = function get (obj, path, val) {
	let segments = split(path);

	for (let i = 0, len = segments.length; i < len; i++) {
		let segment = segments[i];

		obj = obj[segment];
		if (!is_object(obj) && i !== len - 1) return val;
	}

	return obj === null || obj === undefined
		? val
		: obj;
}


function isPrototypePolluted (key) {
  return ['__proto__', 'prototype', 'constructor'].includes(key);
}


module.exports.set = function set (obj, path, val) {
	let segments = split(path);

	for (let i = 0, len = segments.length; i < len; i++) {
    let segment = segments[i];
    
    if (isPrototypePolluted(segment)) continue;

		if (!is_object(obj[segment])) obj[segment] = {};
		if (i === len - 1) obj[segment] = val;

		obj = obj[segment];
	}

	return obj;
}

module.exports.del = function del (obj, path) {
	let segments = split(path);

	for (let i = 0, len = segments.length; i < len; i++) {
		let segment = segments[i];

		if (i === len - 1) {
			delete obj[segment];
			return true;
		}

		obj = obj[segment];
		if (!is_object(obj) && i !== len - 1) return false;
	}

	return false;
}

module.exports.has = function has (obj, path) {
	let segments = split(path);

	for (let i = 0, len = segments.length; i < len; i++) {
		let segment = segments[i];

		if (i === len - 1) {
			return segment in obj;
		}

		obj = obj[segment];
		if (!is_object(obj) && i !== len - 1) return false;
	}

	return false;
}
