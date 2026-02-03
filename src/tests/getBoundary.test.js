import getBoundary from "../getBoundary";

describe("getBoundary tests", () => {
	it("should return undefined for invalid boundary", () => {
		const boundary = getBoundary({ "content-type": "multipart/form-data; boundar=---" });
		expect(boundary).toBeNull();
	});

	it("should boundary for valid input", () => {
		const boundary = getBoundary({ "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryAcje1kGXOi5cXZeu" });
		expect(boundary).toBe("----WebKitFormBoundaryAcje1kGXOi5cXZeu");
	});
});
