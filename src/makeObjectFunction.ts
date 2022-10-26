import escapeString from "./escapeString";
import makeFunction from "./makeFunction";
import makeObjectPatternsFunction from "./makeObjectPatternsFunction";
import makeObjectTypesFunction from "./makeObjectTypesFunction";
import makeStructFunction from "./makeStructFunction";
import { ObjectType, StringiferOptions } from "./types";

export default function makeObjectFunction(
	type: ObjectType,
	options: StringiferOptions
): string {
	// If only one of them exists, redirect straight to that to reduce extra function calls.
	if (
		Object.keys(type).filter((key) =>
			["children", "patterns", "types"].includes(key)
		).length === 1
	) {
		if (type.children) {
			return makeStructFunction(type as any, options, true);
		}
		if (type.patterns) {
			return makeObjectPatternsFunction(type as any, options, true);
		}
		if (type.types) {
			return makeObjectTypesFunction(type as any, options, true);
		}
	}

	// Otherwise we need to build up a combination of them.
	// TODO: Save the keys that have been made already so they aren't added multiple times.
	// "Is the above done?", I ask myself as I ignore the comment.
	let template = `let str="{";`;
	template += `const matchedKeys=[${Object.keys(
		type.children ? type.children : {}
	)
		.map((key) => escapeString(key))
		.join(",")}];`;

	template += `const list=[];`;

	if ("children" in type) {
		template += `list.push(this.${makeStructFunction(
			type as any,
			options
		)}(node));`;
	}
	if ("patterns" in type) {
		template += `list.push(this.${makeObjectPatternsFunction(
			type as any,
			options
		)}(node, matchedKeys));`;
	}
	if ("types" in type) {
		template += `list.push(this.${makeObjectTypesFunction(
			type as any,
			options
		)}(node, matchedKeys));`;
	}

	template += `return str+list.filter(s=>s.length>0).join(",")+"}"`;

	// Make the function instance and return the name.
	return makeFunction(type, template);
}
