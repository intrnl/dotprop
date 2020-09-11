import { suite } from 'uvu';
import { is } from 'uvu/assert';
import { has } from '../lib';


let it = suite('has');

it('should return truthy value for existing shallow prop', () => {
	let key = 'foo';
	let obj = { [key]: undefined };

	let res = has(obj, key);
	is(res, true);
});

it('should return falsy value for nonexistent shallow prop', () => {
	let key = 'bar';
	let obj = {};

	let res = has(obj, key);
	is(res, false);
});

it('should return truthy value for existing deep prop', () => {
	let key = 'foo.bar';
	let obj = { foo: { bar: undefined } };

	let res = has(obj, key);
	is(res, true);
});

it('should return falsy value for nonexistent deep prop', () => {
	let key = 'bar.foo';
	let obj = { foo: { bar: undefined } };

	let res = has(obj, key);
	is(res, false);
});

it.run();
