import makeArrayTemplate from "#wjs/makeArrayTemplate";
import makeObjectTemplate from "#wjs/makeObjectTemplate";
import makeStructTemplate from "#wjs/makeStructTemplate";
import makeTupleTemplate from "#wjs/makeTupleTemplate";
import { ReplacerFunction, Schema } from "#wjs/types";

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
