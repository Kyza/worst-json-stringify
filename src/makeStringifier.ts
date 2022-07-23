import escapeString from "./escapeString";
import makeValueString from "./makeValueString";
import { ReplacerFunction, Schema } from "./types";

export default function makeStringifier(
	schema: Schema,
	options?: {
		replacer?: ReplacerFunction | void;
		escaper?: (str: string) => string;
		bindings?: Record<PropertyKey, any>;
	}
) {
	options ??= {};
	// options.replacer ??= undefined;
	options.escaper ??= escapeString;
	options.bindings ??= {};
	// console.log(makeValueString("", schema, [], options.replacer));

	const stringifier = new Function(
		"obj",
		`return ${makeValueString("", schema, [], options.replacer)};`
	);
	const boundStringifier = stringifier.bind({
		escapeString: options.escaper,
		...options.bindings,
	});
	// Preserve the toString for debugging.
	boundStringifier.toString = () => stringifier.toString();
	// Change name.
	Object.defineProperty(boundStringifier, "name", {
		writable: false,
		value: "WORST.stringify",
	});
	return boundStringifier;
}
