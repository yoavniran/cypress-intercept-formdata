import fileFieldContentParser from "../fileFieldContentParser";
import fileFieldParser from "../fileFieldParser";

vi.mock("../fileFieldParser")

describe("fileFieldContentParser tests", () => {
	it("should fail gracefully when not configured", () => {
		const result = fileFieldContentParser("bla bla", { });
		expect(result).to.eq(null);
	});

	it("should fail gracefully when not file", () => {
		const result = fileFieldContentParser("bla bla", { loadFileContent: true });
		expect(result).to.eq(null);
	});

	it("should load file content", () => {
		fileFieldParser.mockReturnValueOnce(["file", "flower.jpg"]);

		const result = fileFieldContentParser("bla bla Content-Type: image/jpeg\r\n\r\n--", { loadFileContent: true });

		expect(result[0]).toBe("file");
		expect(result[1]).toBeInstanceOf(File);
		expect(result[1].name).toBe("flower.jpg");
		expect(result[1].type).toBe("image/jpeg");
	});

	it("should fail silently if no content type", () => {
		fileFieldParser.mockReturnValueOnce(["file", "flower.jpg"]);

		const result = fileFieldContentParser("bla bla \r\n\r\n--", { loadFileContent: true });
		expect(result).to.eq(null);
	});
});
