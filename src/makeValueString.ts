import makeArrayTemplate from "./makeArrayTemplate.js";
import makeObjectTemplate from "./makeObjectTemplate.js";
import makeStructTemplate from "./makeStructTemplate.js";
import makeTupleTemplate from "./makeTupleTemplate.js";
import { ReplacerFunction, Type } from "./types.js";

export default function makeValueString(
	accessor: string,
	type: Type,
	deep: PropertyKey[],
	replacer: ReplacerFunction | void,
	iterator?: boolean
) {
	let override;
	if (typeof replacer === "function") {
		override = replacer(accessor, { ...type }, [...deep], !!iterator);
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
			checkCode = `${override}`;
		}

		return `${checkCode}return acc+${makeValueString(
			accessor,
			type,
			deep,
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
			return makeTupleTemplate(type as any, deep, replacer);
		case "array":
			return makeArrayTemplate(type as any, deep, replacer);
		case "struct":
			return makeStructTemplate(type as any, deep, replacer);
		case "object":
			return makeObjectTemplate(type as any, deep, replacer);
		default:
			// If the type is not specified, return the accessor.
			return accessor;
	}
}

function anonymous(obj) {
	return (
		"[" +
		'"' +
		this.escapeString(obj[0]) +
		'"' +
		"," +
		undefined +
		"," +
		(!Number.isFinite(obj[2]) ? null : obj[2]) +
		"," +
		"[" +
		obj[3].map((obj) => {
			if (typeof obj === "boolean") {
				return obj;
			}
			if (typeof obj === "number") {
				return !Number.isFinite(obj) ? null : obj;
			}
			return obj;
		}) +
		"]" +
		"]"
	);
}
