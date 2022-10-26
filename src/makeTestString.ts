import makeValueString from "./makeValueString";
import { replacerCancel } from "./symbols";
import { StringiferOptions, Type } from "./types";

export default function makeTestString(
	type: Type,
	accessor: string,
	options: StringiferOptions
) {
	if (typeof options.replacer?.test === "function") {
		const result = options.replacer.test({
			type,
			accessor,
			string: "str",
			options,
			makeValueString: () => makeValueString(type, accessor, options),
		});
		if (result !== replacerCancel) return result;
	}

	let template = "";
	let addedTest = true;

	switch (type.type) {
		case "string":
			template = `if(typeof ${accessor}==="string"){`;
			break;
		case "number":
			template = `if(typeof ${accessor}==="number"){`;
			break;
		case "boolean":
			template = `if(typeof ${accessor}==="boolean"){`;
			break;
		case "struct":
			template = `if(typeof ${accessor}==="object"){`;
			break;
		case "tuple":
		case "array":
			template = `if(Array.isArray(${accessor})){`;
			break;
		default:
			addedTest = false;
			break;
	}

	return `${template}str+=${makeValueString(
		type,
		accessor,
		options
	)};continue;${addedTest ? "}" : ""}`;
}
