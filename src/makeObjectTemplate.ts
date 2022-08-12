import accessSubKey from "#wjs/accessSubKey";
import makeValueString from "#wjs/makeValueString";
import { ObjectType, ReplacerFunction } from "#wjs/types";

export default function makeObjectTemplate(
	schema: ObjectType,
	deep: PropertyKey[] = [],
	replacer?: ReplacerFunction | void
) {
	const accessor = accessSubKey(deep);
	let template = `"{"+Object.entries(${accessor}).reduce((acc,[key, obj],i)=>{if(i>0)acc+=",";acc+='"'+this.escapeString(key)+'":';`;

	let first = true;
	for (let type of schema.types) {
		template += makeValueString("obj", type, [], replacer, true);

		if (first) first = false;
	}

	return template + `return acc;},"")+"}"`;
}
