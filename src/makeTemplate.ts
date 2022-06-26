import makeStructTemplate from "./makeStructTemplate";
import makeObjectTemplate from "./makeObjectTemplate";
import makeTupleTemplate from "./makeTupleTemplate";
import makeArrayTemplate from "./makeArrayTemplate";
import { Schema } from "./types";

export default function makeBaseTemplate(
	schema: Schema,
	deep: PropertyKey[] = []
) {
	switch (schema.type) {
		case "struct":
			return makeStructTemplate(schema, deep);
		case "object":
			return makeObjectTemplate(schema, deep);
		case "tuple":
			return makeTupleTemplate(schema, deep);
		case "array":
			return makeArrayTemplate(schema, deep);
		default:
			throw new Error(`Invalid base schema: ${schema}`);
	}
}
