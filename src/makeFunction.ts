import { functions } from "./makeStringifier";
import { Type } from "./types";

export default function makeFunction(
	type: Type,
	source: string,
	args: string[] = []
) {
	if (functions.has(source)) {
		return functions.get(source)!.name;
	}
	const name = `_${functions.size}_${type.type}`;

	functions.set(source, {
		name,
		func: new Function("node", ...args, source),
	});

	return name;
}
