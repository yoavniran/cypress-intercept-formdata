describe("cifd test - javascript submit", () => {

	beforeEach(() => {
		cy.visit("cypress/test.html");
	});

	it("should be able to intercept formdata sent with XHR", () => {
		cy.intercept("PUT", "http://test-server/upload", {
			statusCode: 200,
			body: {success: true}
		}).as("submitForm");

		cy.fixture("flower.jpg", { encoding: null })
			.as("uploadFile");

		cy.get("#first")
			.type("james");

		cy.get("#last")
			.type("bond");

		cy.get("#file")
			.selectFile("@uploadFile");

		cy.get("#submitFormJs")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["first"]).to.eq("james");
				expect(formData["last"]).to.eq("bond");
				expect(formData["file"]).to.eq("flower.jpg");
			});
	});
});
