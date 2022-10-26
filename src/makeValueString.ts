import makeArrayFunction from "./makeArrayFunction";
import makeObjectFunction from "./makeObjectFunction";
import makeStructFunction from "./makeStructFunction";
import makeTupleFunction from "./makeTupleFunction";
import { replacerCancel } from "./symbols";
import {
	ArrayType,
	ObjectType,
	StringiferOptions,
	StructType,
	TupleType,
	Type,
} from "./types";

export default function makeValueString(
	type: Type,
	accessor: string,
	options: StringiferOptions
): string {
	if (typeof options.replacer?.value === "function") {
		const result = options.replacer.value({ type, accessor, options });
		if (result !== replacerCancel) return result;
	}

	switch (type.type) {
		case "const":
			return "`" + type.value + "`";
		case "string":
			// type.escape should default to true if not specified.
			if (type.escape || type.escape == null) {
				return `this.escapeString(${accessor})`;
			}
			// Speed.
			return `'"'+${accessor}+'"'`;
		case "number":
			// Follow the JSON specification and convert Infinity and NaN to null. 🤮
			// Number.isFinite returns false for Infinity and NaN.
			// JSON.stringify(undefined) returns the literal undefined so check for this as well.
			return `(!Number.isFinite(${accessor})?${accessor}===undefined?undefined:null:${accessor})`;
		case "tuple":
			return `this.${makeTupleFunction(
				type as TupleType,
				options
			)}(${accessor})`;
		case "array":
			return `this.${makeArrayFunction(
				type as ArrayType,
				options
			)}(${accessor})`;
		case "object":
			return `this.${makeObjectFunction(
				type as ObjectType,
				options
			)}(${accessor})`;
		case "struct":
			return `this.${makeStructFunction(
				type as StructType,
				options,
				true
			)}(${accessor})`;
		case "boolean":
		default:
			// If the type is not specified, return the accessor.
			return accessor;
	}
}
