import makeArrayTemplate from "#wjs/makeArrayTemplate";
import makeObjectTemplate from "#wjs/makeObjectTemplate";
import makeStructTemplate from "#wjs/makeStructTemplate";
import makeTupleTemplate from "#wjs/makeTupleTemplate";
import { ReplacerFunction, Schema } from "#wjs/types";

export default function makeTemplate(
	schema: Schema,
	path: PropertyKey[] = [],
	replacer?: ReplacerFunction | void
) {
	switch (schema.type) {
		case "struct":
			return makeStructTemplate(schema, path, replacer);
		case "object":
			return makeObjectTemplate(schema, path, replacer);
		case "tuple":
			return makeTupleTemplate(schema, path, replacer);
		case "array":
			return makeArrayTemplate(schema, path, replacer);
		default:
			throw new Error(`Invalid base schema: ${schema}`);
	}
}
