import accessSubKey from "#wjs/accessSubKey";
import makeValueString from "#wjs/makeValueString";
import { ReplacerFunction, TupleType } from "#wjs/types";

export default function makeTupleTemplate(
	schema: TupleType,
	deep: PropertyKey[] = [],
	replacer?: ReplacerFunction | void
) {
	let template = '"["';

	let first = true;
	let key = 0;
	for (let type of schema.children) {
		const newDeep = [...deep, key];
		const accessor = accessSubKey(newDeep);
		let nextValueString = "";

		nextValueString = makeValueString(accessor, type, newDeep, replacer);

		// Tuple children can't be optional.
		template += `+${first ? "" : '","+'}${nextValueString}`;

		if (first) first = false;
		key++;
	}

	return template + '+"]"';
}
