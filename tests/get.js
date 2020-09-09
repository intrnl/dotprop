import { suite } from 'uvu';
import { is } from 'uvu/assert';
import { get } from '../lib';


let it = suite('get');

it('should return a shallow value', () => {
	let value = 'bar';
	let res = get({ foo: value }, 'foo');

	is(res, value);
});

it('should return a deep value', () => {
	let value = 'hello world!';
	let res = get({ foo: { bar: { baz: value } } }, 'foo.bar.baz');

	is(res, value);
});

it('should return a default shallow value', () => {
	let default_value = 'bar';
	let res = get({ foo: 'bar' }, 'baz', default_value);

	is(res, default_value);
});

it('should return a default deep value', () => {
	let default_value = 'baz';
	let res = get({ foo: 'bar' }, 'bar.foo.baz', default_value);

	is(res, default_value);
});

it.run();
