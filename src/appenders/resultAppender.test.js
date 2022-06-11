import resultAppender from "./resultAppender";

describe("resultAppender tests", () => {
	it("should append simple name/value", () => {
		const result = resultAppender({}, "test", "111");
		expect(result.test).to.equal("111");
	});

	it("should append a new array", () => {
		const result = resultAppender({}, "test", 1, "[0]");
		expect(result["test"]).to.eql([1]);
	});

	it("should append to existing array", () => {
		const result = resultAppender({ test: [1, 2] }, "test", 3, "[2]");
		expect(result["test"]).to.eql([1, 2, 3]);
	});

	it("should append array of objects", () => {
		const result = resultAppender(
			resultAppender(
				resultAppender(
					resultAppender({}, "test", "30", "[0][id]"),
					"test", "steph", "[0][name]"),
				"test", "0", "[1][id]"),
			"test", "jt", "[1][name]",
		);

		expect(result["test"]).to.eql([
			{ id: "30", name: "steph" },
			{ id: "0", name: "jt" },
		]);
	});

	it("should append array of objects with kebab-case prop names", () => {
		const result = resultAppender(
			resultAppender(
				resultAppender(
					resultAppender({}, "test", "steph", "[0][first-name]"),
				"test", "30", "[0][id]"),
				"test", "0", "[1][id]"),
			"test", "jayson", "[1][first-name]",
		);

		console.log("RESULT ==== ", result);

		expect(result["test"]).to.eql([
			{ id: "30", "first-name": "steph" },
			{ id: "0", "first-name": "jayson" },
		]);
	});

	it("should append array of objects with snake_case prop names", () => {
		const result = resultAppender(
			resultAppender(
				resultAppender(
					resultAppender({}, "test", "steph", "[0][first_name]"),
					"test", "30", "[0][id]"),
				"test", "0", "[1][id]"),
			"test", "jayson", "[1][first_name]",
		);

		console.log("RESULT ==== ", result);

		expect(result["test"]).to.eql([
			{ id: "30", "first_name": "steph" },
			{ id: "0", "first_name": "jayson" },
		]);
	});

	it("should append array of objects with nested arrays", () => {
		const result = resultAppender(
			resultAppender(
				resultAppender(
					resultAppender(
						resultAppender(
							resultAppender(
								resultAppender({}, "test", "2009", "[0][years][0]"),
								"test", "2010", "[0][years][1]"),
							"test", "30", "[0][id]"),
						"test", "steph", "[0][name]"),
					"test", "0", "[1][id]"),
				"test", "jt", "[1][name]"),
			"test", "2017", "[1][years][0]");

		expect(result["test"]).to.eql([
			{ id: "30", name: "steph", years: ["2009", "2010"] },
			{ id: "0", name: "jt", years: ["2017"] },
		]);
	});

	it("should work with duplicate path & value", () => {
		const result = resultAppender({}, "test", "foo", "[0][0]");
		expect(result["test"][0][0]).to.equal("foo");

		const result2 = resultAppender({}, "test", "foo", "[0][0]");
		expect(result2["test"][0][0]).to.equal("foo");
	});

	it("should overwrite existing value in same path", () => {
		const result = resultAppender({}, "test", "foo", "[0][0]");
		expect(result["test"][0][0]).to.equal("foo");

		const result2 = resultAppender({}, "test", "bar", "[0][0]");
		expect(result2["test"][0][0]).to.equal("bar");
	});
});
