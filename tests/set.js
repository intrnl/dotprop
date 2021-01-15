import { suite } from 'uvu';
import { is, not } from 'uvu/assert';
import { set } from '../lib';


let it = suite('set');

it('should set a shallow value', () => {
	let obj = {};
	let value = 'unicorn';

	set(obj, 'foo', value);

	is(obj.foo, value);
})

it('should set a deep value', () => {
	let obj = {};
	let value = 'horse';

	set(obj, 'foo.bar.baz', value);

	is(obj.foo.bar.baz, value);
});

it('should prevent prototype pollution', () => {
	let obj = {};
	let value = 'Yes, its polluted.';

	set(obj, '__proto__.polluted', value);

  is(obj.polluted, value);
  not({}.polluted, value);
  is({}.polluted, undefined);
});

it.run();
