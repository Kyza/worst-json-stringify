import accessSubKey from "./accessSubKey";
import escapeString from "./escapeString";
import makeValueString from "./makeValueString";
import { StructType } from "./types";

export default function makeStructTemplate(
	type: StructType,
	deep: PropertyKey[] = []
) {
	let template = '"{"';

	let first = true;
	for (let [childKey, childType] of Object.entries(type.children)) {
		const accessor = accessSubKey([...deep, childKey]);
		let nextValueString = "";

		nextValueString = makeValueString(accessor, childType, [...deep, childKey]);

		// If the type is optional, make sure to optional chain the accessor.
		if (childType.optional) {
			const optionalAccessor = accessSubKey([...deep, childKey], true);
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
