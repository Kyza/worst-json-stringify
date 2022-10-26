/**
 * Testing `SJS` performance against native `JSON.stringify` and the fastest
 * stringifier in town `fast-json-stringify`
 */

import { makeStringifier } from "#dist";
import fjs from "fast-json-stringify";
import protobuf from "protobufjs";
import { attr, escape, sjs } from "slow-json-stringify";

import { bench, group, run } from "mitata";

group("large string", () => {
	// Lorem ipsum pretty long text
	const obj = {
		string: ` itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

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
	const fastStringify = fjs({
		type: "object",
		properties: {
			string: { type: "string" },
			uint32: { type: "number" },
			inner: {
				type: "object",
				properties: {
					int32: { type: "number" },
					innerInner: {
						type: "object",
						properties: {
							long: {
								type: "object",
								properties: {
									low: { type: "number" },
									high: { type: "number" },

									unsigned: { type: "boolean" },
								},
							},
							enum: { type: "number" },
							enum1: { type: "number" },
							enum2: { type: "number" },
							enum3: { type: "number" },
							enum4: { type: "number" },
							enum5: { type: "number" },
							enum6: { type: "number" },
							enum7: { type: "number" },
							enum8: { type: "number" },
							enum9: { type: "number" },
							enum0: { type: "number" },
							sint32: { type: "number" },
						},
					},
					outer: {
						type: "object",
						properties: {
							bool: {
								type: "array",
								items: { anyOf: [{ type: "boolean" }] },
							},
							double: { type: "number" },
						},
					},
				},
			},
			float: { type: "number" },
		},
	});

	// Slow-json-stringify schema
	const escaper = escape();
	const slowStringify = sjs({
		string: attr(
			"string"
			// , (s) => escaper(s)
		),
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

	const worstStringify = makeStringifier({
		type: "struct",
		children: {
			string: { type: "string", escape: false },
			uint32: { type: "number" },
			inner: {
				type: "struct",
				children: {
					int32: { type: "number" },
					innerInner: {
						type: "struct",
						children: {
							long: {
								type: "struct",
								children: {
									low: { type: "number" },
									high: { type: "number" },

									unsigned: { type: "boolean" },
								},
							},
							enum: { type: "number" },
							enum1: { type: "number" },
							enum2: { type: "number" },
							enum3: { type: "number" },
							enum4: { type: "number" },
							enum5: { type: "number" },
							enum6: { type: "number" },
							enum7: { type: "number" },
							enum8: { type: "number" },
							enum9: { type: "number" },
							enum0: { type: "number" },
							sint32: { type: "number" },
						},
					},
					outer: {
						type: "struct",
						children: {
							bool: {
								type: "array",
								types: [{ type: "boolean" }],
							},
							double: { type: "number" },
						},
					},
				},
			},
			float: { type: "number" },
		},
	});

	console.log(worstStringify.toString());

	const MessageType = protobuf
		.loadSync("./benchmark/benchmark.proto")
		.lookupType("Test");

	bench("native", () => {
		JSON.stringify(obj);
	});
	bench("fast-json-stringify", () => {
		fastStringify(obj);
	});
	bench("slow-json-stringify", () => {
		slowStringify(obj);
	});
	bench("worst-json-stringify", () => {
		worstStringify(obj);
	});
	bench("protobuf", () => {
		MessageType.encode(MessageType.create(obj)).finish();
	});
});

group("limited type object", () => {
	const obj = {
		string0: "hello",
		string1: "hello",
		string2: "hello",
		string3: "hello",
		string4: ` itaque deserunt fuga facilis voluptate. Corrupti dolores velit deserunt. Ipsam consequatur est labore.

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
		string5: "hello",
		string6: "hello",
		string7: "hello",
		string8: "hello",
		string9: "hello",
		num0: 0,
		num1: 0,
		num2: 0,
		num3: 0,
		num4: 0,
		num5: 0,
		num6: 0,
		num7: 0,
		num8: 0,
		num9: 0,
	};

	// Fast-json-stringify schema
	const fastStringify = fjs({
		type: "object",
		patternProperties: {
			string: { type: "string" },
			num: { type: "number" },
		},
	});

	const worstStringify = makeStringifier({
		type: "object",
		patterns: {
			[/string/.toString()]: { type: "string" },
			[/num/.toString()]: { type: "number" },
		},
	});

	// console.log(worstStringify2.toString());

	bench("native", () => {
		JSON.stringify(obj);
	});
	bench("fast-json-stringify", () => {
		fastStringify(obj);
	});
	// bench("slow-json-stringify", () => {
	// 	slowStringify(obj);
	// });
	bench("worst-json-stringify", () => {
		worstStringify(obj);
	});
	// bench("protobuf", () => {
	// 	MessageType.encode(MessageType.create(obj)).finish();
	// });
});

group("static small object", () => {
	const obj = {
		name: "Jarred",
		age: NaN,
		alive: true,
	};

	// Fast-json-stringify schema
	const fastStringify = fjs({
		type: "object",
		properties: {
			name: { type: "string" },
			age: { type: "number" },
			alive: { type: "boolean" },
		},
	});

	// console.log(fastStringify.toString(), fastStringify(obj));

	// Slow-json-stringify schema
	const escaper = escape();
	const slowStringify = sjs({
		name: attr("string", (s) => escaper(s)),
		age: attr("number"),
		alive: attr("boolean"),
	});

	const worstStringify = makeStringifier({
		type: "struct",
		children: {
			name: { type: "string" },
			age: { type: "number" },
			alive: { type: "boolean" },
		},
	});

	// console.log(worstStringify2.toString(), worstStringify2(obj));

	bench("native", () => {
		JSON.stringify(obj);
	});
	bench("fast-json-stringify", () => {
		fastStringify(obj);
	});
	bench("slow-json-stringify", () => {
		slowStringify(obj);
	});
	bench("worst-json-stringify", () => {
		worstStringify(obj);
	});
	// bench("protobuf", () => {
	// 	MessageType.encode(MessageType.create(obj)).finish();
	// });
});

await run({
	avg: true, // enable/disable avg column (default: true)
	json: false, // enable/disable json output (default: false)
	colors: true, // enable/disable colors (default: true)
	min_max: true, // enable/disable min/max column (default: true)
	collect: false, // enable/disable collecting returned values into an array during the benchmark (default: false)
	percentiles: true, // enable/disable percentiles column (default: true)
});
