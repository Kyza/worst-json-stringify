import makeBaseTemplate from "./makeTemplate";
import escapeString from "./escapeString";
import { Schema } from "./types";

export default function makeStringifier(
	schema: Schema,
	options?: {
		escaper?: (str: string) => string;
	}
) {
	options ??= {};
	options.escaper ??= escapeString;

	const stringifier = new Function(
		"obj",
		`return ${makeBaseTemplate(schema)};`
	);
	const boundStringifier = stringifier.bind({
		escapeString: options.escaper,
	});
	// Preserve the toString for debugging.
	boundStringifier.toString = () => stringifier.toString();
	return boundStringifier;
}
