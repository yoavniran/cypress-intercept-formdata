/// <reference types="cypress" />
import { CyHttpMessages, Interception } from "cypress/types/net-stubbing";

declare global {
  namespace Cypress {
    interface Chainable<Subject = Interception> {
      interceptFormData(cb: (formData: Record<string, any>) => void): Chainable<Subject>;
    }
  }
}

export const interceptFormData: (request: CyHttpMessages.IncomingHttpRequest) => Record<string, any>;
