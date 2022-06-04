/* istanbul ignore file */
import interceptFormData from "./interceptFormData";

Cypress.Commands
	.add("interceptFormData", { prevSubject: true }, (interception, cb) => {
		cy.wrap(interceptFormData(interception.request))
			.then(cb)
			.then(() => interception);
	});

export {
	interceptFormData,
};
