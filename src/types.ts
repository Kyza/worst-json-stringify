import escapeString from "./escapeString";
import makeValueString from "./makeValueString";
import { replacerCancel } from "./symbols";

export type StructType = {
	type: "struct";
	children: Record<PropertyKey, OptionalType>;
};
export type ObjectType = {
	type: "object";
	children?: Record<PropertyKey, OptionalType>;
	patterns?: Record<PropertyKey, Type>;
	types?: Type[];
} & (
	| {
			children: Record<PropertyKey, OptionalType>;
	  }
	| {
			patterns: Record<PropertyKey, Type>;
	  }
	| { types: Type[] }
);
export type TupleType = {
	type: "tuple";
	children: Type[];
};
export type ArrayType = {
	type: "array";
	types: Type[];
};
export type StringType = {
	type: "string";
	escape?: boolean;
};
export type ConstType = {
	type: "const";
	value: unknown;
};
export type BooleanType = {
	type: "boolean";
};
export type NumberType = {
	type: "number";
};

export type KnownType =
	| ObjectType
	| StructType
	| TupleType
	| ArrayType
	| StringType
	| ConstType
	| BooleanType
	| NumberType;
export type CustomType = {
	// A string that isn't a known type.
	type: Exclude<string, KnownType["type"]>;
	[key: PropertyKey]: unknown;
};

export type Type = KnownType | CustomType;
export type OptionalType = Type & { optional?: true };

export type Schema = Type;

export type ReplacerValueFunction = (args: {
	type: Type;
	accessor: string;
	options: StringiferOptions;
}) => string | typeof replacerCancel;
export type ReplacerTestFunction = (args: {
	type: Type;
	accessor: string;
	string: string;
	options: StringiferOptions;
	makeValueString: () => ReturnType<typeof makeValueString>;
}) => string | typeof replacerCancel;

export type RequiredOne<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type StringiferOptions = {
	replacer?: {
		test: ReplacerTestFunction | void;
		value: ReplacerValueFunction | void;
	};
	escaper?: typeof escapeString;
	bindings?: Record<PropertyKey, any>;
};

export type StringiferFunction = (object?: any) => string | never;
