import { makeStringifier } from "./dist";

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
		replacer: (accessor, type, path, iterator) => {
			// Add BigInt support.
			if (!iterator && type.type === "bigint") {
				return `${accessor}+"n"`;
			}
			// Add Infinity and NaN support.
			if (!iterator && type.type === "number" && type.ieee754) {
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
console.log(stringifyUser([Infinity, NaN, 2n, /a/g]));
