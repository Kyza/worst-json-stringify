import accessSubKey from "#wjs/accessSubKey";
import makeValueString from "#wjs/makeValueString";
import { ArrayType, ReplacerFunction } from "#wjs/types";

export default function makeArrayTemplate(
	schema: ArrayType,
	path: PropertyKey[] = [],
	replacer?: ReplacerFunction | void
) {
	const accessor = accessSubKey(path);
	let template = `"["+${accessor}.reduce((acc,obj,i)=>{if(i>0)acc+=",";`;

	let first = true;
	for (let type of schema.types) {
		template += makeValueString("obj", type, [], replacer, true);

		if (first) first = false;
	}

	return template + `return acc;},"")+"]"`;
}
