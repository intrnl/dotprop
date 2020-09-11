import { suite } from 'uvu';
import { is } from 'uvu/assert';
import { del } from '../lib';


let it = suite('del');

it('should delete a shallow prop', () => {
	let key = 'foo';
	let obj = { [key]: 123 };

	del(obj, key);
	is(key in obj, false);
});

it('should delete a deep prop', () => {
	let key = 'foo.bar';
	let obj = { foo: { bar: 123 } };

	del(obj, key);
	is('bar' in obj.foo, false);
});

it.run();
