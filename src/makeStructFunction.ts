import accessSubkey from "./accessSubkey.js";
import escapeString from "./escapeString";
import makeFunction from "./makeFunction";
import makeValueString from "./makeValueString";
import {
	ObjectType,
	RequiredOne,
	StringiferOptions,
	StructType,
} from "./types";

export default function makeStructFunction(
	type: StructType | RequiredOne<ObjectType, "children">,
	options: StringiferOptions,
	objectify: boolean = false
) {
	let template = `return "${objectify ? "{" : ""}"`;

	// Sort the entries by placing all the optional ones at the beginning.
	// This avoids the trailing comma bug without having to iterate at runtime.
	const entries = Object.entries(type.children).sort((a, b) => {
		const aType = a[1];
		const bType = b[1];

		if (aType.optional && !bType.optional) return -1;
		if (!aType.optional && bType.optional) return 1;
		return 0;
	});

	let i = 0;
	for (let [childKey, childType] of entries) {
		const accessor = accessSubkey([childKey]);
		const nextValueString = makeValueString(childType, accessor, options);

		// If the type is optional surround it in a check.
		if (childType.optional) {
			template += `+(${accessor}!=null?`;
		}

		// There's no need to check if the key exists if it's not optional.
		// This leads to the fastest case.
		template += `${childType.optional ? "" : "+"}'${escapeString(
			childKey
		)}:'+${nextValueString}${i < entries.length - 1 ? '+","' : ""}`;

		if (childType.optional) {
			template += ':"")';
		}

		i++;
	}

	// Make the function instance and return the name.
	return makeFunction(type, template + (objectify ? '+"}"' : ""));
}
