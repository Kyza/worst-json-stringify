import escapeString from "#wjs/escapeString";
import makeValueString from "#wjs/makeValueString";
import { ReplacerFunction, Schema } from "#wjs/types";

export default function makeStringifier(
	schema: Schema,
	options?: {
		replacer?: ReplacerFunction | void;
		escaper?: (str: string) => string;
		bindings?: Record<PropertyKey, any>;
	}
) {
	options ??= {};
	options.escaper ??= escapeString;
	options.bindings ??= {};

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

	return boundStringifier;
}
