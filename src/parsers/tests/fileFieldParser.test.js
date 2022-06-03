import fileFieldParser from "../fileFieldParser";

describe("fileFieldParser tests", () => {
	it("should fail gracefully", () => {
		const result = fileFieldParser("bla bla");
		expect(result).to.eq(null);
	});

	it("should get file name", () => {
		const result = fileFieldParser(`\r\nContent-Disposition: form-data; name="file"; filename="flower.jpg"\r\nContent-Type: image/jpeg\r`);
		expect(result).to.eql(["file", "flower.jpg"]);
	});

	it("should get file name with different field name", () => {
		const result = fileFieldParser(`\r\nContent-Disposition: form-data; name="upload"; filename="flower.jpg"\r\nContent-Type: image/jpeg\r`);
		expect(result).to.eql(["upload", "flower.jpg"]);
	});
});
