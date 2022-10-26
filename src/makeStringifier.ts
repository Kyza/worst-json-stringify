import escapeString from "./escapeString";
import makeFunction from "./makeFunction";
import makeValueString from "./makeValueString";
import { Schema, StringiferFunction, StringiferOptions } from "./types";

export const functions: Map<string, { name: string; func: Function }> =
	new Map();

const blankRegex = /^this\.(_\d+_\w+)\(\w+\)$/;

export default function makeStringifier(
	schema: Schema,
	options?: StringiferOptions
): StringiferFunction {
	options ??= {};
	options.escaper ??= escapeString;
	options.bindings ??= {};

	// Make all the levels.
	const valueString = makeValueString(schema, "node", options);

	let baseFunctionName: string;
	// Optimize out an extra level of recursion if the base would just be a function call.
	// Kinda icky nasty but it works.
	if (blankRegex.test(valueString)) {
		baseFunctionName = valueString.match(blankRegex)![1];
	} else {
		baseFunctionName = makeFunction(schema, `return ${valueString}`);
	}

	let baseFunction: StringiferFunction;

	// Grab all the functions that were created.
	// Add the escaper function onto them.
	const allFunctions: {
		[name: string]: Function;
	} = { escapeString: options.escaper };
	for (let [_, { name, func }] of functions) {
		if (name === baseFunctionName) {
			baseFunction = func as StringiferFunction;
		}
		allFunctions[name] = func;
	}

	if (baseFunction! == null)
		throw new Error("Base stringifier function was not found.");

	const allFunctionsString = JSON.stringify(allFunctions, (_key, value) => {
		if (typeof value === "function") {
			return value.toString();
		}
		return value;
	});

	// Bind all the functions.
	baseFunction = baseFunction.bind(allFunctions);

	// Ensure the top level return is a string.
	function ensureStringFunction(obj?: object) {
		const result = baseFunction(obj);
		if (typeof result !== "string" && result !== undefined) {
			return JSON.stringify(result);
		}
		return result;
	}

	const ensureStringFunctionString =
		ensureStringFunction.toString() as string;

	// Override the toString to show the source code since it's available.
	ensureStringFunction.toString = () => {
		return `(${ensureStringFunctionString}).bind(${allFunctionsString})`;
	};

	return ensureStringFunction;
}
