describe("cifd test - formdata xhr with multi-line", () => {

	it("should be able to intercept formdata with multi-line text", () => {
		cy.visit("cypress/test.html");

		cy.intercept("PUT", "http://test-server/upload", {
			statusCode: 200,
			body: {success: true}
		}).as("submitForm");

		cy.fixture("flower.jpg", { encoding: null })
			.as("uploadFile");

		cy.get("#free-text")
			.type(`bla bla
			More text
			another line
			wow thats a lot 
			`);

		cy.get("#file")
			.selectFile("@uploadFile");

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
