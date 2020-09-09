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


export function get (obj, path, val) {
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

export function set (obj, path, val) {
	let segments = split(path);

	for (let i = 0, len = segments.length; i < len; i++) {
		let segment = segments[i];

		if (!is_object(obj[segment])) obj[segment] = {};
		if (i === len - 1) obj[segment] = val;

		obj = obj[segment];
	}

	return obj;
}

export function del (obj, path) {
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

export function has (obj, path) {
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
