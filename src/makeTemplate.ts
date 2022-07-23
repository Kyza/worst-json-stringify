import makeArrayTemplate from "./makeArrayTemplate";
import makeObjectTemplate from "./makeObjectTemplate";
import makeStructTemplate from "./makeStructTemplate";
import makeTupleTemplate from "./makeTupleTemplate";
import { ReplacerFunction, Schema } from "./types";

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
