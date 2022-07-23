import { makeStringifier } from "../src";

const stringifyUser = makeStringifier(
	{
		type: "struct",
		children: {
			firstName: { type: "string" },
			lastName: { type: "string", optional: true },
			age: { type: "number" },
			obj: {
				type: "object",
				types: [{ type: "boolean" }],
			},
		},
	},
	{
		replacer: (accessor, type, deep, iterator) => {
			// Add BigInt support.
			if (!iterator && type.type === "bigint") {
				return `${accessor}+"n"`;
			}
			// Add Infinity and NaN support.
			if (!iterator && type.type === "number") {
				return accessor;
			}
			// Add RegExp support.
			if (type.type === "regex") {
				if (iterator) {
					return `if(${accessor} instanceof RegExp)`;
				} else {
					return `${accessor}.toString()`;
				}
			}
		},
	}
);
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

// const stringifyTuple = makeStringifier(
// 	{
// 		type: "tuple",
// 		children: [
// 			{ type: "string" },
// 			{ type: "bigint" },
// 			{ type: "regex" },
// 			{ type: "number" },
// 			{
// 				type: "array",
// 				types: [{ type: "boolean" }, { type: "number" }, { type: "regex" }],
// 			},
// 		],
// 	},
// {
// 	replacer: (accessor, type, deep, iterator) => {
// 		// Add BigInt support.
// 		if (!iterator && type.type === "bigint") {
// 			return `${accessor}+"n"`;
// 		}
// 		// Add Infinity and NaN support.
// 		if (!iterator && type.type === "number") {
// 			return accessor;
// 		}
// 		// Add RegExp support.
// 		if (type.type === "regex") {
// 			if (iterator) {
// 				return `if(${accessor} instanceof RegExp)`;
// 			} else {
// 				return `${accessor}.toString()`;
// 			}
// 		}
// 	},
// }
// );
// console.log(stringifyTuple.toString());
// console.log(
// 	stringifyTuple([
// 		"cool",
// 		100n,
// 		/dajsdjka/i,
// 		Infinity,
// 		[true, NaN, /fdghjdsfds/gi],
// 	])
// );
