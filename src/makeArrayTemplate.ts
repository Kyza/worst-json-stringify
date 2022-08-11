import accessSubKey from "./accessSubKey.js";
import makeValueString from "./makeValueString.js";
import { ArrayType, ReplacerFunction } from "./types.js";

export default function makeArrayTemplate(
	schema: ArrayType,
	deep: PropertyKey[] = [],
	replacer?: ReplacerFunction | void
) {
	const accessor = accessSubKey(deep);
	let template = `"["+${accessor}.reduce((acc,obj,i)=>{if(i>0)acc+=",";`;

	let first = true;
	let key = 0;
	for (let type of schema.types) {
		template += makeValueString("obj", type, [], replacer, true);

		if (first) first = false;
		key++;
	}

	return template + `return acc;},"")+"]"`;
}
