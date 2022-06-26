import { makeStringifier } from "./dist";

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
				two: { type: "boolean" },
			},
		},
	},
});
console.log(stringifyUser.toString());
console.log(
	stringifyUser({
		firstName: "John\u1782",
		age: NaN,
		obj: {
			one: true,
			two: false,
		},
	})
);

const stringifyTuple = makeStringifier({
	type: "tuple",
	children: [
		{ type: "string" },
		{ type: "number", fullIEEE754: true },
		{ type: "tuple", children: [{ type: "boolean" }, { type: "number" }] },
	],
});
console.log(stringifyTuple.toString());
console.log(stringifyTuple(["cool", Infinity, [true, NaN]]));
