describe("cifd test - javascript submit", () => {

	beforeEach(() => {
		cy.visit("cypress/test.html");
	});

	it("should be able to intercept formdata sent with XHR", () => {
		cy.intercept("PUT", "http://test-server/upload", {
			statusCode: 200,
			body: {success: true}
		}).as("submitForm");

		cy.get("#first")
			.type("james");

		cy.get("#last")
			.type("bond");

		cy.get("#file")
			.attachFile("flower.jpg");

		cy.get("#submitFormJs")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["first"]).to.eq("james");
				expect(formData["last"]).to.eq("bond");
				expect(formData["file"]).to.eq("flower.jpg");
			});
	});

	it("should be able to intercept formdata with multi-line text", () => {
		cy.intercept("PUT", "http://test-server/upload", {
			statusCode: 200,
			body: {success: true}
		}).as("submitForm");

		cy.get("#free-text")
			.type(`bla bla
			More text
			another line
			wow thats a lot 
			`);

		cy.get("#file")
			.attachFile("flower.jpg");

		cy.get("#submitFormJs")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["file"]).to.eq("flower.jpg");
				expect(formData["free"]).to.contain("bla bla");
				expect(formData["free"]).to.contain("More text");
				expect(formData["free"]).to.contain("another line");
				expect(formData["free"]).to.contain("wow thats a lot");
			});
	});
});
