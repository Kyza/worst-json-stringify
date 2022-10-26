import { makeStringifier } from "#wjs";
import * as assert from "node:assert";
import { test } from "node:test";

test("top level primitives", async (t) => {
	await t.test("number", (t) => {
		const stringifier = makeStringifier({
			type: "number",
		});

		assert.strictEqual(typeof stringifier, "function");

		assert.strictEqual(stringifier(19), JSON.stringify(19));
		assert.strictEqual(
			stringifier(Number.MIN_SAFE_INTEGER),
			JSON.stringify(Number.MIN_SAFE_INTEGER)
		);
		assert.strictEqual(
			stringifier(Number.MAX_SAFE_INTEGER),
			JSON.stringify(Number.MAX_SAFE_INTEGER)
		);

		assert.strictEqual(stringifier(NaN), JSON.stringify(NaN));
		assert.strictEqual(stringifier(Infinity), JSON.stringify(Infinity));

		assert.strictEqual(stringifier(null), JSON.stringify(null));
		assert.strictEqual(stringifier(undefined), JSON.stringify(undefined));

		// @ts-ignore JSON.stringify does support no arguments.
		assert.strictEqual(stringifier(), JSON.stringify());
	});

	await t.test("boolean", (t) => {
		const stringifier = makeStringifier({
			type: "boolean",
		});

		assert.strictEqual(typeof stringifier, "function");

		assert.strictEqual(stringifier(true), JSON.stringify(true));
		assert.strictEqual(stringifier(false), JSON.stringify(false));

		assert.strictEqual(stringifier(null), JSON.stringify(null));
		assert.strictEqual(stringifier(undefined), JSON.stringify(undefined));

		// @ts-ignore JSON.stringify does support no arguments.
		assert.strictEqual(stringifier(), JSON.stringify());
	});

	await t.test("string", (t) => {
		const stringifier = makeStringifier({
			type: "string",
		});

		assert.strictEqual(typeof stringifier, "function");

		assert.strictEqual(stringifier("Jarred"), JSON.stringify("Jarred"));

		assert.strictEqual(stringifier(null), JSON.stringify(null));
		assert.strictEqual(stringifier(undefined), JSON.stringify(undefined));

		// @ts-ignore JSON.stringify does support no arguments.
		assert.strictEqual(stringifier(), JSON.stringify());
	});

	await t.test("const", (t) => {
		const stringifier = makeStringifier({
			type: "const",
			value: '"Jarred"',
		});

		assert.strictEqual(typeof stringifier, "function");

		assert.strictEqual(stringifier(), JSON.stringify("Jarred"));
	});
});
