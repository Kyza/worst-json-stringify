import { makeStringifier } from "#src";
import { describe, expect, it } from "vitest";

describe("top level primitives", async () => {
	it.concurrent("number", () => {
		const stringifier = makeStringifier({
			type: "number",
		});

		expect(typeof stringifier).toBe("function");

		expect(stringifier(19)).toBe(JSON.stringify(19));
		expect(stringifier(Number.MIN_SAFE_INTEGER)).toBe(
			JSON.stringify(Number.MIN_SAFE_INTEGER)
		);
		expect(stringifier(Number.MAX_SAFE_INTEGER)).toBe(
			JSON.stringify(Number.MAX_SAFE_INTEGER)
		);

		expect(stringifier(NaN)).toBe(JSON.stringify(NaN));
		expect(stringifier(Infinity)).toBe(JSON.stringify(Infinity));

		expect(stringifier(null)).toBe(JSON.stringify(null));
		expect(stringifier(undefined)).toBe(JSON.stringify(undefined));

		// @ts-ignore JSON.stringify does support no arguments.
		expect(stringifier()).toBe(JSON.stringify());
	});

	it.concurrent("boolean", () => {
		const stringifier = makeStringifier({
			type: "boolean",
		});

		expect(typeof stringifier).toBe("function");

		expect(stringifier(true)).toBe(JSON.stringify(true));
		expect(stringifier(false)).toBe(JSON.stringify(false));

		expect(stringifier(null)).toBe(JSON.stringify(null));
		expect(stringifier(undefined)).toBe(JSON.stringify(undefined));

		// @ts-ignore JSON.stringify does support no arguments.
		expect(stringifier()).toBe(JSON.stringify());
	});

	it.concurrent("string", () => {
		const stringifier = makeStringifier({
			type: "string",
		});

		expect(typeof stringifier).toBe("function");

		expect(stringifier("Jarred")).toBe(JSON.stringify("Jarred"));

		expect(stringifier(null)).toBe(JSON.stringify(null));
		expect(stringifier(undefined)).toBe(JSON.stringify(undefined));

		// @ts-ignore JSON.stringify does support no arguments.
		expect(stringifier()).toBe(JSON.stringify());
	});

	it.concurrent("const", () => {
		const stringifier = makeStringifier({
			type: "const",
			value: '"Jarred"',
		});

		expect(typeof stringifier).toBe("function");

		expect(stringifier()).toBe(JSON.stringify("Jarred"));
	});
});
