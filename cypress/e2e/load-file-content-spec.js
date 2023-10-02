describe("cifd test - file content", () => {
	beforeEach(() => {
		cy.visit("cypress/test.html");
	});

	it("should load the content of the file from the request", () => {
		cy.intercept("POST", "http://test-server/upload", {
			statusCode: 200,
			body: { success: true },
		}).as("submitForm");

		cy.fixture("binary1", { encoding: null })
			.as("uploadFile");

		cy.get("#first")
			.type("james");

		cy.get("#last")
			.type("bond");

		cy.get("#file")
			.selectFile({
				contents: "@uploadFile",
				fileName: "file1.glb",
			});

		cy.get("#submitForm")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["first"]).to.eq("james");
				expect(formData["last"]).to.eq("bond");

				expect(formData["file"]).to.be.instanceof(File);
				expect(formData["file"]).to.have.property("type", "model/gltf-binary");
				expect(formData["file"].size).to.be.eq(2551829);
			}, { loadFileContent: true });
	});

	it("should load the content of multiple files from the request", () => {
		cy.intercept("PUT", "http://test-server/upload", {
			statusCode: 200,
			body: { success: true },
		}).as("submitForm");

		cy.fixture("flower.jpg", { encoding: null })
			.as("imageFile");

		cy.fixture("sample.txt", { encodiing: null })
			.as("textFile");

		cy.get("#first")
			.type("james");

		cy.get("#last")
			.type("bond");

		cy.get("#file")
			.selectFile([{
				contents: "@imageFile",
				fileName: "flower.jpg",
			},
				{
					contents: "@textFile",
					fileName: "sample.txt",
				},
			]);

		cy.get("#submitFormJs")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				expect(formData["first"]).to.eq("james");
				expect(formData["last"]).to.eq("bond");

				expect(formData["file"][0]).to.be.instanceof(File);
				expect(formData["file"][0]).to.have.property("type", "image/jpeg");

				expect(formData["file"][1]).to.be.instanceof(File);
				expect(formData["file"][1]).to.have.property("type", "text/plain");

				const reader = new FileReader();
				reader.onload = () => {
					expect(reader.result).to.eq("CIFD is awesome!")
				};
				reader.readAsText(formData["file"][1]);

				// console.log("IMG FILE", formData["file"][0]);
				// const a = document.createElement("a");
				// a.download = formData["file"][0].name;
				// a.rel = "noopener";
				// a.href = URL.createObjectURL(formData["file"][0])
				// a.dispatchEvent(new MouseEvent("click"));

				// 	const img = document.createElement("img");
				// 	img.src = URL.createObjectURL(formData["file"][0])
			// 	document.body.appendChild(img);
			// 	console.log(img);
			}, { loadFileContent: true });
	});
});
