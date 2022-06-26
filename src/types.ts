export type StructType = {
	type: "struct";
	children: Record<PropertyKey, OptionalType>;
};
export type ObjectType = {
	type: "object";
	types: Type[];
};
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
export type BooleanType = {
	type: "boolean";
};
export type NumberType = {
	type: "number";
	fullIEEE754?: boolean;
};

export type Type =
	| StructType
	| ObjectType
	| TupleType
	| ArrayType
	| StringType
	| BooleanType
	| NumberType;
export type OptionalType = Type & { optional?: true };

export type Schema =
	| Omit<StructType, "optional">
	| Omit<ObjectType, "optional">
	| Omit<TupleType, "optional">
	| Omit<ArrayType, "optional">;
