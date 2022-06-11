import fileFieldParser from "../fileFieldParser";

describe("fileFieldParser tests", () => {
	it("should fail gracefully", () => {
		const result = fileFieldParser("bla bla");
		expect(result).to.eq(null);
	});

	it("should parse file field", () => {
		const result = fileFieldParser(`\r\nContent-Disposition: form-data; name="file"; filename="flower.jpg"\r\nContent-Type: image/jpeg\r`);
		expect(result).to.eql(["file", "flower.jpg"]);
	});

	it("should parse file field with different field name", () => {
		const result = fileFieldParser(`\r\nContent-Disposition: form-data; name="upload"; filename="flower.jpg"\r\nContent-Type: image/jpeg\r`);
		expect(result).to.eql(["upload", "flower.jpg"]);
	});

	it("should parse file field for field name with kebab-case ", () => {
		const result = fileFieldParser(`\r\nContent-Disposition: form-data; name="kebab-case"; filename="flower.jpg"\r\nContent-Type: image/jpeg\r`);
		expect(result).to.eql(["kebab-case", "flower.jpg"]);
	});

	it("should parse file field for field with snake_case ", () => {
		const result = fileFieldParser(`\r\nContent-Disposition: form-data; name="snake_case"; filename="flower.jpg"\r\nContent-Type: image/jpeg\r`);
		expect(result).to.eql(["snake_case", "flower.jpg"]);
	});

	it("should parse file field for file name with kebab-case", () => {
		const result =
			fileFieldParser(`\r\nContent-Disposition: form-data; name="kebab-case"; filename="pretty-flower.jpg"\r\nContent-Type: image/jpeg\r`);
		expect(result).to.eql(["kebab-case", "pretty-flower.jpg"]);
	});

	it("should parse file field for file name with snake_case", () => {
		const result =
			fileFieldParser(`\r\nContent-Disposition: form-data; name="snake_case"; filename="pretty_flower.jpg"\r\nContent-Type: image/jpeg\r`);
		expect(result).to.eql(["snake_case", "pretty_flower.jpg"]);
	});
});
