import makeFunction from "./makeFunction";
import makeTestString from "./makeTestString";
import { ArrayType, StringiferOptions } from "./types";

export default function makeArrayFunction(
	type: ArrayType,
	options: StringiferOptions
) {
	let template = `let str="[";for(let i=0;i<node.length;i++){if(i>0)str+=",";`;

	for (let childType of type.types) {
		template += makeTestString(childType, "node[i]", options);
	}

	template += '}return str+"]";';

	return makeFunction(type, template);
}
