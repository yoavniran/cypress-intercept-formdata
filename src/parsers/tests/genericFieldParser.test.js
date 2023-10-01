import genericFieldParser from "../genericFieldParser";

describe("genericFieldParser tests", () => {
	it("should ignore empty field", () => {
		const result = genericFieldParser("");
		expect(result).to.eql(null);
	});

	it("should ignore invalid field", () => {
		const result = genericFieldParser("--");
		expect(result).to.eql(null);
	});

	it("should parse simple field", () => {
		const [name, value, path] = genericFieldParser(`\r\nContent-Disposition: form-data; name="first"\r\n\r\njames\r\n--`);

		expect(name).to.eql("first");
		expect(value).to.eql("james");
		expect(path).toBe("");
	});

	it("should parse field with path", () => {
		const [name, value, path] = genericFieldParser(`\r\nContent-Disposition: form-data; name="extra[0]"\r\n\r\n30\r\n--`);
		expect(name).to.eql("extra");
		expect(value).to.eql("30");
		expect(path).to.eql("[0]");
	});

	it("should parse field with long path", () => {
		const [name, value, path] = genericFieldParser(`\r\nContent-Disposition: form-data; name="extra[0][id][1][name]"\r\n\r\n30\r\n--`);
		expect(name).to.eql("extra");
		expect(value).to.eql("30");
		expect(path).to.eql("[0][id][1][name]");
	});

	it("should parse field with kebab-case", () => {
		const [name, value] = genericFieldParser(`\r\nContent-Disposition: form-data; name="kebab-case"\r\n\r\nyummi\r\n--`);
		expect(name).to.eql("kebab-case");
		expect(value).to.eql("yummi");
	});

	it("should parse field with snake_case", () => {
		const [name, value] = genericFieldParser(`\r\nContent-Disposition: form-data; name="snake_case"\r\n\r\nsssss\r\n--`);
		expect(name).to.eql("snake_case");
		expect(value).to.eql("sssss");
	});

	it("should parse field with path using kebab-case", () => {
		const [name, value, path] = genericFieldParser(`\r\nContent-Disposition: form-data; name="extra[0][kebab-case][1][name]"\r\n\r\n30\r\n--`);
		expect(name).to.eql("extra");
		expect(value).to.eql("30");
		expect(path).to.eql("[0][kebab-case][1][name]");
	});

	it("should parse field with path using snake_case", () => {
		const [name, value, path] = genericFieldParser(`\r\nContent-Disposition: form-data; name="extra[0][snake_case][1][name]"\r\n\r\n30\r\n--`);
		expect(name).to.eql("extra");
		expect(value).to.eql("30");
		expect(path).to.eql("[0][snake_case][1][name]");
	});

	it("should parse field with . in name", () => {
		const [name, value] = genericFieldParser(`\r\nContent-Disposition: form-data; name="TICKET.email"\r\n\r\ntest\r\n--`);
		expect(name).to.eql("TICKET.email");
		expect(value).to.eql("test");
	});

	it("should parse field with email value", () => {
		const [name, value] = genericFieldParser(`\r\nContent-Disposition: form-data; name="TICKET.email"\r\n\r\ntest@gmail.com\r\n--`);
		expect(name).to.eql("TICKET.email");
		expect(value).to.eql("test@gmail.com");
	});
});
