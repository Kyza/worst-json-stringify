export default function accessSubKey(keys: PropertyKey[], optional?: boolean) {
	optional ??= false;

	if (keys.length === 0) {
		return "obj";
	}

	// TODO: Use dot notation instead of bracket notation when possible.
	let accessor = "obj[";

	for (let i = 0; i < keys.length; i++) {
		switch (typeof keys[i]) {
			case "string":
				// @ts-ignore TS doesn't support narrowing with switch.
				accessor += `"${keys[i]}"`;
				break;
			case "number":
				// @ts-ignore TS doesn't support narrowing with switch.
				accessor += keys[i];
				break;
			default:
				accessor += keys[i].toString();
				break;
		}
		if (i < keys.length - 1) accessor += optional ? "]?.[" : "][";
	}

	return accessor + `]`;
}
