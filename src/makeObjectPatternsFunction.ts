import makeFunction from "./makeFunction";
import makeValueString from "./makeValueString";
import { ObjectType, RequiredOne, StringiferOptions } from "./types";

export default function makeObjectPatternsFunction(
	type: RequiredOne<ObjectType, "patterns">,
	options: StringiferOptions,
	objectify: boolean = false
) {
	let template = `let str="${objectify ? "{" : ""}";`;
	template += `const ents=Object.entries(node)${
		objectify ? "" : `.filter(([key])=>!matchedKeys.includes(key))`
	};`;
	template += `for(let i=0;i<ents.length;i++){`;

	for (let [regex, childType] of Object.entries(type.patterns)) {
		const nextValueString = makeValueString(
			childType,
			"ents[i][1]",
			options
		);

		// An actual RegExp is required.
		template += `if(${regex}.test(ents[i][0])){${
			objectify ? "" : "matchedKeys.push(ents[i][0]);"
		}`;
		template += `if(i>0)str+=",";str+=this.escapeString(ents[i][0])+':';`;
		template += `str+=${nextValueString}}`;
	}

	template += `}return str${objectify ? `+"}"` : ""};`;

	return makeFunction(type, template, ["matchedKeys=[]"]);
}
