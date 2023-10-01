describe("cifd test - multiple", () => {
	beforeEach(() => {
		cy.visit("cypress/test.html");
	});

	it("should be able to intercept formdata with multiple files", () => {
		cy.intercept("POST", "http://test-server/upload", {
			statusCode: 200,
			body: { success: true },
		}).as("submitForm");

		cy.fixture("flower.jpg", { encoding: null })
			.as("uploadFile");

		cy.get("#first")
			.type("james");

		cy.get("#last")
			.type("bond");

		cy.get("#file")
			.selectFile([{
				contents: "@uploadFile",
				fileName: "file1.jpg",
			},
				{
					contents: "@uploadFile",
					fileName: "file2.jpg",
				},
			]);

		cy.get("#submitForm")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["file"][0]).to.eq("file1.jpg");
				expect(formData["file"][1]).to.eq("file2.jpg");
			});
	});
});
