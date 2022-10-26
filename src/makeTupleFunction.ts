import accessSubkey from "./accessSubkey";
import makeFunction from "./makeFunction";
import makeValueString from "./makeValueString";
import { StringiferOptions, TupleType } from "./types";

export default function makeTupleFunction(
	type: TupleType,
	options: StringiferOptions
) {
	let template = 'return "["';

	let first = true;
	let key = 0;
	for (let childType of type.children) {
		const accessor = accessSubkey([key]);
		const nextValueString = makeValueString(childType, accessor, options);

		// Tuple children can't be optional.
		template += `+${first ? "" : '","+'}${nextValueString}`;

		if (first) first = false;
		key++;
	}

	return makeFunction(type, template + '+"]"');
}
