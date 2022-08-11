import accessSubKey from "./accessSubKey.js";
import escapeString from "./escapeString.js";
import makeValueString from "./makeValueString.js";
import { ReplacerFunction, StructType } from "./types.js";

export default function makeStructTemplate(
	type: StructType,
	deep: PropertyKey[] = [],
	replacer?: ReplacerFunction | void
) {
	let template = '"{"';

	let first = true;
	for (let [childKey, childType] of Object.entries(type.children)) {
		const newDeep = [...deep, childKey];
		const accessor = accessSubKey(newDeep);
		let nextValueString = "";

		nextValueString = makeValueString(accessor, childType, newDeep, replacer);

		// If the type is optional, make sure to optional chain the accessor.
		if (childType.optional) {
			const optionalAccessor = accessSubKey(newDeep, true);
			// We only need to access with optional chaining to check if it exists. If it does we can use the accessor without optional chaining for more speed.
			template += `+(${optionalAccessor}!=null?\`${
				first ? "" : ","
			}"${escapeString(childKey)}":${nextValueString}\`:"")`;
		} else {
			// There's no need to check if the key exists if it's not optional.
			// This leads to the fastest case.
			template += `+'${first ? "" : ","}"${escapeString(
				childKey
			)}":'+${nextValueString}`;
		}

		if (first) first = false;
	}

	return template + '+"}"';
}
