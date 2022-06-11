describe("cifd test - form submit with different file name", () => {

	beforeEach(() => {
		cy.visit("cypress/test.html");
	});

	it("should be able to intercept formdata from submitted form with snake_case file name", () => {
		cy.intercept("POST", "http://test-server/upload", {
			statusCode: 200,
			body: {success: true}
		}).as("submitForm");

		cy.fixture("flower.jpg", { encoding: null })
			.as("uploadFile");

		cy.get("#first")
			.type("james");

		cy.get("#last")
			.type("bond");

		cy.get("#full-name")
			.type("james bond");

		cy.get("#phone_number")
			.type("007");

		cy.get("#file")
			.selectFile({
				contents: "@uploadFile",
				fileName: "pretty_flower.jpg",
			});

		cy.get("#submitForm")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["first"]).to.eq("james");
				expect(formData["last"]).to.eq("bond");
				expect(formData["full-name"]).to.eq("james bond");
				expect(formData["phone_number"]).to.eq("007");
				expect(formData["file"]).to.eq("pretty_flower.jpg");
			});
	});

	it("should be able to intercept formdata from submitted form with kebab-case file name", () => {
		cy.intercept("POST", "http://test-server/upload", {
			statusCode: 200,
			body: {success: true}
		}).as("submitForm");

		cy.fixture("flower.jpg", { encoding: null })
			.as("uploadFile");

		cy.get("#first")
			.type("james");

		cy.get("#last")
			.type("bond");

		cy.get("#full-name")
			.type("james bond");

		cy.get("#phone_number")
			.type("007");

		cy.get("#file")
			.selectFile({
				contents: "@uploadFile",
				fileName: "pretty-flower.jpg",
			});

		cy.get("#submitForm")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["first"]).to.eq("james");
				expect(formData["last"]).to.eq("bond");
				expect(formData["full-name"]).to.eq("james bond");
				expect(formData["phone_number"]).to.eq("007");
				expect(formData["file"]).to.eq("pretty-flower.jpg");
			});
	});

	it("should be able to intercept formdata from submitted form with mixed snake_case & kebab-case file name", () => {
		cy.intercept("POST", "http://test-server/upload", {
			statusCode: 200,
			body: {success: true}
		}).as("submitForm");

		cy.fixture("flower.jpg", { encoding: null })
			.as("uploadFile");

		cy.get("#first")
			.type("james");

		cy.get("#last")
			.type("bond");

		cy.get("#full-name")
			.type("james bond");

		cy.get("#phone_number")
			.type("007");

		cy.get("#file")
			.selectFile({
				contents: "@uploadFile",
				fileName: "very_pretty-flower.jpg",
			});

		cy.get("#submitForm")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["first"]).to.eq("james");
				expect(formData["last"]).to.eq("bond");
				expect(formData["full-name"]).to.eq("james bond");
				expect(formData["phone_number"]).to.eq("007");
				expect(formData["file"]).to.eq("very_pretty-flower.jpg");
			});
	});
});
