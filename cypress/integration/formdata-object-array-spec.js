import { serialize } from "object-to-formdata";

describe("cifd test - formdata xhr with array of objects", () => {
	it("should be able to intercept formdata with array of objects", () => {
		cy.visit("cypress/test.html");

		cy.intercept("PUT", "http://test-server/upload", {
			statusCode: 200,
			body: { success: true },
		}).as("submitForm");

		cy.fixture("flower.jpg", { encoding: null })
			.as("uploadFile");

		cy.get("#file")
			.selectFile("@uploadFile");

		cy.get("#first")
			.type("james");

		cy.window()
			.then((w) => {
				w._testExtraData = [
					{ id: 30, name: "steph" },
					{ id: 0, name: "jt" },
				];

				w._fdSerialize = serialize;
			});

		cy.get("#submitFormJs")
			.click();

		cy.wait("@submitForm")
			.interceptFormData((formData) => {
				console.log("!!!!!!!!! ", formData);
				expect(formData["file"]).to.eq("flower.jpg");

				expect(formData["extra"][0].id).to.eq("30")
				expect(formData["extra"][0].name).to.eq("steph");

				expect(formData["extra"][1].id).to.eq("0")
				expect(formData["extra"][1].name).to.eq("jt");

				expect(formData["first"]).to.eq("james");
			});
	});
});
