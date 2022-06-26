import escapeString from "./escapeString";
import accessSubKey from "./accessSubKey";
import makeValueString from "./makeValueString";
import { TupleType, Type } from "./types";

export default function makeTupleTemplate(
	schema: TupleType,
	deep: PropertyKey[] = []
) {
	let template = '"["';

	let first = true;
	let key = 0;
	for (let type of schema.children) {
		const accessor = accessSubKey([...deep, key]);
		let nextValueString = "";

		nextValueString = makeValueString(accessor, type as Type, [...deep, key]);

		// Tuple children can't be optional.
		template += `+${first ? "" : '","+'}${nextValueString}`;

		if (first) first = false;
		key++;
	}

	return template + '+"]"';
}
