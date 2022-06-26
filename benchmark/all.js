/**
 * Testing `SJS` performance against native `JSON.stringify` and the fastest
 * stringifier in town `fast-json-stringify`
 */
import Benchmark from "benchmark";

import fjs from "fast-json-stringify";
import { sjs, attr } from "slow-json-stringify";
import { makeStringifier } from "../dist/index.js";
import protobuf from "protobufjs";
import parse from "fast-json-parse";

const suite = new Benchmark.Suite();

// Lorem ipsum pretty long text
const obj = {
	string: `Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.

Quaerat itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

Nisi voluptate aliquid hic molestias. Labore perspiciatis voluptas explicabo error dolores sequi porro. Tenetur quia minima hic cum porro repellat possimus laborum.

Vel odit quidem asperiores quos quos. Quae eius officiis qui. Voluptate dolores autem ea.

Ut recusandae libero soluta. Cupiditate hic id et officia et. Odit odio dolore et incidunt quae. Perspiciatis blanditiis porro et libero quas provident.

Et qui necessitatibus vel. Vel saepe sit voluptatem sequi. Debitis ut ducimus dolor dignissimos eum pariatur omnis. Et ut tempora quibusdam soluta est aut sit molestiae. Placeat aut et sit minima et. Fugit qui commodi nihil exercitationem quia quam ut.`,
	uint32: 9000,
	inner: {
		int32: 20161110,
		innerInner: {
			long: {
				low: 1051,
				high: 151234,
				unsigned: false,
			},
			enum: 1,
			enum1: 1,
			enum2: 2,
			enum3: 3,
			enum4: 4,
			enum5: 5,
			enum6: 6,
			enum7: 7,
			enum8: 8,
			enum9: 9,
			enum0: 0,

			sint32: -42,
		},
		outer: {
			bool: [true, false, false, true, false, false, true],
			double: 204.8,
		},
	},
	float: 0.25,
};

// Fast-json-stringify schema
// const fastStringify = fjs({
// 	$schema: "http://json-schema.org/draft-04/schema#",
// 	type: "object",
// 	properties: {
// 		status: {
// 			type: "string",
// 		},
// 		data: {
// 			type: "object",
// 			properties: {
// 				id: {
// 					type: "string",
// 				},
// 				first_name: {
// 					type: "string",
// 				},
// 				last_surname: {
// 					type: "string",
// 				},
// 				email: {
// 					type: "string",
// 				},
// 				gender: {
// 					type: "string",
// 				},
// 				age: {
// 					type: "integer",
// 				},
// 				phone: {
// 					type: "string",
// 				},
// 				country: {
// 					type: "string",
// 				},
// 				state: {
// 					type: "string",
// 				},
// 				city: {
// 					type: "string",
// 				},
// 				street: {
// 					type: "string",
// 				},
// 				house: {
// 					type: "integer",
// 				},
// 			},
// 			required: [
// 				"id",
// 				"first_name",
// 				"last_surname",
// 				"email",
// 				"gender",
// 				"age",
// 				"phone",
// 				"country",
// 				"state",
// 				"city",
// 				"street",
// 				"house",
// 			],
// 		},
// 	},
// 	required: ["status", "data"],
// });

// Slow-json-stringify schema
const slowStringify = sjs({
	string: attr("string"),
	uint32: attr("number"),
	inner: {
		int32: attr("number"),
		innerInner: {
			long: {
				low: attr("number"),
				high: attr("number"),

				unsigned: attr("boolean"),
			},
			enum1: attr("number"),
			enum2: attr("number"),
			enum3: attr("number"),
			enum4: attr("number"),
			enum5: attr("number"),
			enum6: attr("number"),
			enum7: attr("number"),
			enum8: attr("number"),
			enum9: attr("number"),
			enum0: attr("number"),
			enum: attr("number"),
			sint32: attr("number"),
		},
		outer: {
			bool: attr("array"),
			double: attr("number"),
		},
	},
	float: attr("number"),
});

// console.log("result", slowStringify(obj));

const worstStringify = makeStringifier({
	type: "struct",
	children: {
		string: { type: "string", escape: false },
		uint32: { type: "number", fullIEEE754: true },
		inner: {
			type: "struct",
			children: {
				int32: { type: "number", fullIEEE754: true },
				innerInner: {
					type: "struct",
					children: {
						long: {
							type: "struct",
							children: {
								low: { type: "number", fullIEEE754: true },
								high: { type: "number", fullIEEE754: true },

								unsigned: { type: "boolean" },
							},
						},
						enum: { type: "number", fullIEEE754: true },
						enum1: { type: "number", fullIEEE754: true },
						enum2: { type: "number", fullIEEE754: true },
						enum3: { type: "number", fullIEEE754: true },
						enum4: { type: "number", fullIEEE754: true },
						enum5: { type: "number", fullIEEE754: true },
						enum6: { type: "number", fullIEEE754: true },
						enum7: { type: "number", fullIEEE754: true },
						enum8: { type: "number", fullIEEE754: true },
						enum9: { type: "number", fullIEEE754: true },
						enum0: { type: "number", fullIEEE754: true },
						sint32: { type: "number", fullIEEE754: true },
					},
				},
				outer: {
					type: "struct",
					children: {
						bool: {
							type: "tuple",
							children: [
								{ type: "boolean" },
								{ type: "boolean" },
								{ type: "boolean" },
								{ type: "boolean" },
								{ type: "boolean" },
								{ type: "boolean" },
								{ type: "boolean" },
							],
						},
						double: { type: "number", fullIEEE754: true },
					},
				},
			},
		},
		float: { type: "number", fullIEEE754: true },
	},
});

const MessageType = protobuf
	.loadSync("./benchmark/benchmark.proto")
	.lookupType("Test");

const res = [];

const percentageDiff = (arr) => {
	const use = arr.sort((a, b) => b - a);
	return ((use[0] - use[1]) / use[1]) * 100;
};

console.log("```bash");

suite
	.add("native", () => JSON.stringify(obj))
	// .add("fast-json-stringify", () => fastStringify(obj))
	.add("slow-json-stringify", () => slowStringify(obj))
	.add("worst-json-stringify", () => worstStringify(obj))
	.add("protobufjs", () => {
		MessageType.encode(MessageType.create(obj)).finish();
	})
	.on("cycle", (event) => {
		res.push(Math.floor(event.target.hz));
		console.log(String(event.target));
	})
	.on("complete", function () {
		const fastest = this.filter("fastest").map("name");
		console.log(`\n# ${fastest} is +${percentageDiff(res).toFixed(2)}% faster`);
		console.log("```\n");
	})
	.run();

// const strObj = JSON.stringify(obj);
// const msg = pb.encode(pb.create(obj)).finish();

// suite
// 	.add("native", () => JSON.parse(strObj))
// 	.add("fast-json-parse", () => parse(strObj))
// 	.add("protobuf", () => {
// 		pb.toObject(pb.decode(msg));
// 	})
// 	.on("cycle", (event) => {
// 		res.push(Math.floor(event.target.hz));
// 		console.log(String(event.target));
// 	})
// 	.on("complete", function () {
// 		const fastest = this.filter("fastest").map("name");
// 		console.log(`\n# ${fastest} is +${percentageDiff(res).toFixed(2)}% faster`);
// 		console.log("\n```\n");
// 	})
// 	.run();

// `SJS` is faster on nested properties and short text

// native x 911,912 ops/sec ±1.67% (86 runs sampled)
// fast-json-stringify x 3,337,796 ops/sec ±1.62% (87 runs sampled)
// slow-json-stringify x 4,636,561 ops/sec ±3.18% (88 runs sampled)
