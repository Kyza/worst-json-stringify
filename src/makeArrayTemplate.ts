import accessSubKey from "./accessSubKey";
import escapeString from "./escapeString";
import makeValueString from "./makeValueString";
import { ArrayType, Schema, TupleType, Type } from "./types";

export default function makeArrayTemplate(
	schema: ArrayType | TupleType,
	deep: PropertyKey[] = []
) {
	throw new Error("Not implemented.");
}
