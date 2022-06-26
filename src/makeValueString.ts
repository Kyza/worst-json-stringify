import makeTupleTemplate from "./makeTupleTemplate";
import makeStructTemplate from "./makeStructTemplate";
import { Type } from "./types";

export default function makeValueString(
	accessor: string,
	type: Type,
	deep: PropertyKey[]
) {
	switch (type.type) {
		case "string":
			// type.escape should default to true if not specified.
			if (type.escape || type.escape == null) {
				return `'"'+this.escapeString(${accessor})+'"'`;
			}
			// Speed.
			return `'"'+${accessor}+'"'`;
		case "boolean":
			return accessor;
		case "number":
			// If full IEEE 754 support is enabled, just stringify the number.
			if (type.fullIEEE754) {
				return accessor;
			}
			// Otherwise, follow the JSON specification and convert it to null.
			// Number.isFinite returns false for Infinity and NaN.
			return `(!Number.isFinite(${accessor})?null:${accessor})`;
		case "tuple":
			return makeTupleTemplate(type, deep);
		case "array":
			// Not implemented, so fall back to native.
			return `JSON.stringify(${accessor})`;
		case "struct":
			return makeStructTemplate(type, deep);
		case "object":
			// Not implemented, so fall back to native.
			return `JSON.stringify(${accessor})`;
	}
}
