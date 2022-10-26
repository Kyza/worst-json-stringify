import makeFunction from "./makeFunction";
import makeTestString from "./makeTestString";
import { ObjectType, RequiredOne, StringiferOptions } from "./types";

export default function makeObjectTypesFunction(
	type: RequiredOne<ObjectType, "types">,
	options: StringiferOptions,
	objectify: boolean = false
) {
	let template = `let str="${objectify ? "{" : ""}";`;
	template += `const ents=Object.entries(node)${
		objectify ? "" : `.filter(([key])=>!matchedKeys.includes(key))`
	};`;
	template += `for(let i=0;i<ents.length;i++){if(i>0)str+=",";str+=this.escapeString(ents[i][0])+':';`;

	for (let childType of type.types) {
		template += makeTestString(childType, "ents[i][1]", options);
	}

	template += `}return str${objectify ? `+"}"` : ""};`;

	return makeFunction(type, template, ["matchedKeys=[]"]);
}
