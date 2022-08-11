import makeArrayTemplate from "./makeArrayTemplate.js";
import makeObjectTemplate from "./makeObjectTemplate.js";
import makeStructTemplate from "./makeStructTemplate.js";
import makeTupleTemplate from "./makeTupleTemplate.js";
import { ReplacerFunction, Schema } from "./types.js";

export default function makeTemplate(
	schema: Schema,
	deep: PropertyKey[] = [],
	replacer?: ReplacerFunction | void
) {
	switch (schema.type) {
		case "struct":
			return makeStructTemplate(schema, deep, replacer);
		case "object":
			return makeObjectTemplate(schema, deep, replacer);
		case "tuple":
			return makeTupleTemplate(schema, deep, replacer);
		case "array":
			return makeArrayTemplate(schema, deep, replacer);
		default:
			throw new Error(`Invalid base schema: ${schema}`);
	}
}
