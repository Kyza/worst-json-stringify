export const variableRegex = /^[a-z_]+\w+$/i;

export default function accessSubkey(keys: PropertyKey[]): string {
	if (keys.length === 0) {
		return "node";
	}

	let accessor = "node";

	for (let i = 0; i < keys.length; i++) {
		const validVariableName = variableRegex.test(keys[i].toString());
		if (!validVariableName) {
			accessor += '["';
		} else {
			accessor += ".";
		}

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
