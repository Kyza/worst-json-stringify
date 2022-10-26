const variableRegex = /^[a-z_]+\w+$/i;

export default function accessSubkey(keys: PropertyKey[], optional?: boolean) {
	optional ??= false;

	if (keys.length === 0) {
		return "node";
	}

	// TODO: Use dot notation instead of bracket notation when possible.
	let accessor = "node";

	for (let i = 0; i < keys.length; i++) {
		const validVariableName = variableRegex.test(keys[i].toString());
		if (!validVariableName) {
			accessor += '["';
		} else {
			accessor += ".";
		}
		// if (!validVariableName) {
		// 	accessor += optional && i === keys.length - 1 && i > 0 ? '?.["' : '["';
		// } else {
		// 	accessor += optional && i === keys.length - 1 && i > 0 ? "?." : ".";
		// }

		switch (typeof keys[i]) {
			case "number":
				// @ts-ignore TS doesn't support narrowing with switch.
				accessor += keys[i];
				break;
			case "string":
			default:
				accessor += keys[i].toString();
				break;
		}

		if (!validVariableName) {
			accessor += '"]';
		}
	}

	return accessor;
}
