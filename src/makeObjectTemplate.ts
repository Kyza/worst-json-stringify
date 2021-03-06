import accessSubKey from "accessSubKey";
import makeValueString from "makeValueString";
import { ObjectType, ReplacerFunction } from "./types";

export default function makeObjectTemplate(
	schema: ObjectType,
	deep: PropertyKey[] = [],
	replacer?: ReplacerFunction | void
) {
	const accessor = accessSubKey(deep);
	let template = `"{"+Object.entries(${accessor}).reduce((acc,[key, obj],i)=>{if(i>0)acc+=",";acc+='"'+this.escapeString(key)+'":';`;

	let first = true;
	let key = 0;
	for (let type of schema.types) {
		template += makeValueString("obj", type, [], replacer, true);

		if (first) first = false;
		key++;
	}

	return template + `return acc;},"")+"}"`;
}
