import getBodyAsString from "../getBodyAsString";

describe("getBodyAsString tests", () => {
	it("should return string as is", () => {
		const str = "test";
		expect(getBodyAsString(str)).to.eql(str);
	});

	it("should decode array buffer", () => {
		const str = "cidf test buffer";
		const encoder = new TextEncoder();
		const buffer = encoder.encode(str);

		const result = getBodyAsString(buffer);
		expect(result).to.eql(str);
	});
});
