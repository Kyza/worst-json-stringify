# worst-json-stringify

Extremely fast JSON stringifying without iteration.

## Usage

```js
const stringifyUser = makeStringifier({
	type: "struct",
	children: {
		firstName: { type: "string" },
		lastName: { type: "string", optional: true },
		age: { type: "number", fullIEEE754: true },
		obj: {
			type: "struct",
			children: {
				one: { type: "boolean" },
				two: { type: "number" },
			},
		},
	},
});

console.log("Function Source:", stringifyUser.toString());

console.log(
	"User String:",
	stringifyUser({
		firstName: "John\u1782",
		age: Infinity,
		obj: {
			one: true,
			two: NaN,
		},
	})
);
```

## Benchmarks

### Fastest Possible Options

```bash
native x 44,208 ops/sec ±0.74% (94 runs sampled)
slow-json-stringify x 606,916 ops/sec ±1.01% (91 runs sampled)
worst-json-stringify x 1,586,168 ops/sec ±1.27% (91 runs sampled)
protobufjs x 122,347 ops/sec ±1.36% (86 runs sampled)

# worst-json-stringify is +161.35% faster
```

### Safest Possible Options

```bash
native x 43,925 ops/sec ±0.94% (93 runs sampled)
slow-json-stringify x 146,367 ops/sec ±1.45% (91 runs sampled)
worst-json-stringify x 196,445 ops/sec ±0.92% (91 runs sampled)
protobufjs x 88,796 ops/sec ±1.00% (90 runs sampled)

# worst-json-stringify is +34.21% faster
```

Here `slow-json-stringify` is set to escape strings with its default escaper.

## Explaination

Think of it like a macro. It takes in a schema and returns a function that is specifically made to stringify objects that match that schema. The function it generates--assuming it doesn't contain an `object` or `array` type--will stringify the object without using any iteration. That makes it incredibly fast at what it does.

## Types

Currently the following types are supported:

- [x] struct
- [ ] object
- [x] tuple
- [ ] array
- [x] string
- [x] boolean
- [x] number

`struct`, and `tuple` have children. The direct children of a `tuple` can't be optional while the children of a `struct` can.

`object` and `array` don't have children, they have a set of types that can be in them. If there are no types specified, it can be any type. The fewer types that are specified--excluding zero of course--the faster it is to stringify.

`object` and `array` are the only types that can't be stringified without iterating. This is because of the nature of them having unknown lengths. That's why the `struct` and `tuple` types exist.

## Options

By default, the stringifier will escape all strings. This will reduce performance drastically, but it's much safer, especially if you're using large strings. If you are *absolutely sure* you don't need to escape strings, you can pass `escape: false` to the `string` type on the schema.

JSON does not support `Infinity` and `NaN` from IEEE 754, so by default, the stringifier will convert `Infinity` and `NaN` to `null`. This will reduce performance slightly and lose data, but the result will be compatible with the specification and `JSON.parse`. To allow `Infinity` and `NaN` to be stringified "properly", pass `fullIEEE754: true` to the `number` type on the schema.

## TODOs

- Add support for `object` and `array` types.
- Add extensibility.
- Allow individual strings to be escaped with different escapers.
- Implmenent `makeSchema` to allow for dynamic schema creation from unknown JS objects.
- Implement custom serialization for types.
- Publish to NPM.
