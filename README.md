# worst-json-stringify

Extremely fast JSON stringifying *almost* without iteration.

## Usage

```bash
pnpm i worst-json-stringify
```

```js
const stringifyUser = makeStringifier({
	type: "struct",
	children: {
		firstName: { type: "string" },
		lastName: { type: "string", optional: true },
		age: { type: "number" },
		obj: {
			type: "object",
			types: [{ type: "number" }, { type: "boolean" }],
		},
	},
});

console.log("Function Source:", stringifyUser.toString());

console.log(
	"User String:",
	stringifyUser({
		firstName: "Jarred\u1782",
		age: 19,
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
cpu: Intel(R) Core(TM) i7-8086K CPU @ 4.00GHz
runtime: node v17.0.1 (x64-win32)

benchmark                 time (avg)             (min … max)       p75       p99      p995
------------------------------------------------------------ -----------------------------
• large string
------------------------------------------------------------ -----------------------------
native                 24.44 µs/iter    (20.8 µs … 610.8 µs)   22.4 µs   59.3 µs  102.2 µs
fast-json-stringify    23.89 µs/iter     (19.4 µs … 2.08 ms)   21.4 µs   61.5 µs    120 µs
slow-json-stringify     1.62 µs/iter     (1.38 µs … 3.01 µs)   1.68 µs   3.01 µs   3.01 µs
worst-json-stringify  702.44 ns/iter   (636.18 ns … 1.29 µs) 709.02 ns   1.29 µs   1.29 µs
protobuf               10.52 µs/iter      (4.2 µs … 4.76 ms)    8.5 µs   58.6 µs   81.5 µs

summary for large string
  worst-json-stringify
   2.31x faster than slow-json-stringify
   14.98x faster than protobuf
   34x faster than fast-json-stringify
   34.79x faster than native
```

### Safest Possible Options

```bash
cpu: Intel(R) Core(TM) i7-8086K CPU @ 4.00GHz
runtime: node v17.0.1 (x64-win32)

benchmark                 time (avg)             (min … max)       p75       p99      p995
------------------------------------------------------------ -----------------------------
• large string
------------------------------------------------------------ -----------------------------
native                 23.12 µs/iter    (20.8 µs … 237.2 µs)   21.9 µs   41.6 µs   74.7 µs
fast-json-stringify    21.89 µs/iter      (19.3 µs … 766 µs)   20.6 µs   40.3 µs     81 µs
slow-json-stringify     7.39 µs/iter    (6.42 µs … 10.18 µs)   7.84 µs  10.18 µs  10.18 µs
worst-json-stringify    5.12 µs/iter      (4.8 µs … 6.73 µs)   5.06 µs   6.73 µs   6.73 µs
protobuf               10.17 µs/iter      (4.2 µs … 3.53 ms)    8.8 µs   54.2 µs   76.1 µs

summary for large string
  worst-json-stringify
   1.44x faster than slow-json-stringify
   1.99x faster than protobuf
   4.28x faster than fast-json-stringify
   4.52x faster than native
```

## Explaination

Think of it like a macro. It takes in a schema and returns a function that is specifically made to stringify objects that match that schema. The function it generates--assuming it doesn't contain an `object` (with types or patterns) or `array` type--will stringify the object without iterating over any properties. That makes it incredibly fast at what it does.

## Types

Currently the following types are supported:

- [x] struct
- [x] object
- [x] tuple
- [x] array
- [x] string
- [x] boolean
- [x] number

### Struct

Structs are objects that have a static set of keys and values.

### Object

Objects are 

`struct`, and `tuple` have children. The direct children of a `tuple` can't be optional while the children of a `struct` can.

`object` and `array` don't have children, they have a set of types that can be in them. If there are no types specified, it can be any type. The fewer types that are specified--excluding zero of course--the faster it is to stringify.

`object` and `array` are the only types that can't be stringified without iterating. This is because of the nature of them having unknown lengths. That's why the `struct` and `tuple` types exist.

## Options

By default, the stringifier will escape all strings. This will reduce performance drastically, but it's much safer, especially if you're using large strings. If you are *absolutely sure* you don't need to escape strings, you can pass `escape: false` to the `string` type on the schema.

JSON does not support `Infinity` and `NaN` from IEEE 754, so by default the stringifier will convert `Infinity` and `NaN` to `null`. This will reduce performance slightly and lose data, but the result will be compatible with the specification and `JSON.parse`. To allow `Infinity` and `NaN` to be stringified "properly" you will need to use custom a replacer.

```js
const stringifyUser = makeStringifier(
	{
		type: "tuple",
		children: [
			{ type: "number" },
			{ type: "number", ieee754: true },
			{ type: "bigint" },
			{ type: "regex" },
		],
	},
	{
		replacer: {
			test({ type, accessor, string, makeValueString }) {
				switch (type.type) {
					case "bigint":
						return `if(typeof ${accessor}==="bigint"){${string}+=${makeValueString()};continue;}`;
					default:
						return replacerCancel;
				}
			},
			value({ type, accessor }) {
				switch (type.type) {
					case "bigint":
						return `${accessor}+"n"`;
					case "number":
						if ("ieee754" in type) return accessor;
					default:
						return replacerCancel;
				}
			},
		},
	}
);

console.log(stringifyUser.toString());
console.log(stringifyUser([Infinity, NaN, 2n, /a/g]));
```
