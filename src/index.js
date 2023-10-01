/* istanbul ignore file */
import interceptFormData from "./interceptFormData";

Cypress.Commands
	.add("interceptFormData", { prevSubject: true }, (interception, cb, options = {}) => {
		cy.wrap(interceptFormData(interception.request, options))
			.then(cb)
			.then(() => interception);
	});

export {
	interceptFormData,
};
