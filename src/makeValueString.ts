import makeArrayTemplate from "#wjs/makeArrayTemplate";
import makeObjectTemplate from "#wjs/makeObjectTemplate";
import makeStructTemplate from "#wjs/makeStructTemplate";
import makeTupleTemplate from "#wjs/makeTupleTemplate";
import { ReplacerFunction, Type } from "#wjs/types";

export default function makeValueString(
	accessor: string,
	type: Type,
	path: PropertyKey[],
	replacer: ReplacerFunction | void,
	iterator?: boolean
): string {
	let override: string | undefined;
	if (typeof replacer === "function") {
		override = replacer(accessor, { ...type }, [...path], !!iterator);
	}

	if (iterator) {
		let checkCode = "";

		if (override === undefined) {
			switch (type.type) {
				case "string":
					checkCode = `if(typeof ${accessor}==="string")`;
					break;
				case "number":
					checkCode = `if(typeof ${accessor}==="number")`;
					break;
				case "boolean":
					checkCode = `if(typeof ${accessor}==="boolean")`;
					break;
				case "struct":
				case "object":
					checkCode = `if(typeof ${accessor}==="object")`;
					break;
				case "tuple":
				case "array":
					checkCode = `if(Array.isArray(${accessor}))`;
					break;
				default:
					checkCode = `if(true)`;
					break;
			}
		} else {
			// Ensure it's a string.
			checkCode = override.toString();
		}

		return `${checkCode}return acc+${makeValueString(
			accessor,
			type,
			path,
			replacer,
			false
		)};`;
	}

	if (override !== undefined) {
		return override;
	}

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
			// Follow the JSON specification and convert Infinity and NaN to null. 🤮
			// Number.isFinite returns false for Infinity and NaN.
			return `(!Number.isFinite(${accessor})?null:${accessor})`;
		case "tuple":
			return makeTupleTemplate(type as any, path, replacer);
		case "array":
			return makeArrayTemplate(type as any, path, replacer);
		case "struct":
			return makeStructTemplate(type as any, path, replacer);
		case "object":
			return makeObjectTemplate(type as any, path, replacer);
		default:
			// If the type is not specified, return the accessor.
			return accessor;
	}
}
