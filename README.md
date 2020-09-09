# `dotprop`

Safely access or modify object properties with dot-notated path

## Installation

- Install it with your package manager of choice
  - npm: `npm i @intrnl/dotprop`
  - pnpm: `pnpm i @intrnl/dotprop`
  - yarn `yarn add @intrnl/dotprop`

## Usage

```js
import { get, set, del, has } from '@intrnl/dotprop';

let obj = {
  foo: {
    bar: 'baz',
    'baz.baz': 'foo foo',
  },
};

// Get property
get(obj, 'foo.bar') // -> 'baz'
get(obj, 'foo.foo.bar') // -> undefined
get(obj, 'foo.foo.bar', 'default value') // -> 'default value'
get(obj, 'foo.baz\\.baz') // 'foo foo'

// Set property
set(obj, 'baz', 'foo') // -> 'foo'
obj // -> { ..., baz: 'foo' }

set(obj, 'bar.bar.foo', 'horse') // -> 'horse'
obj // -> { ..., bar: { bar: { foo: 'horse' } } }

// Delete property
del(obj, 'bar') // -> true
obj // -> { foo: { ... }, baz: 'foo' }

// Has property
has(obj, 'bar') // -> false
has(obj, 'foo.baz\\.baz') // -> true
```
