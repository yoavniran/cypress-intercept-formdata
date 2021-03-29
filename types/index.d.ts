/// <reference types="cypress" />
import { CyHttpMessages } from "cypress/types/net-stubbing";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      interceptFormData(cb: (formData: Record<string, any>) => void): Chainable<Subject>;
    }
  }
}

export const interceptFormData: (request: CyHttpMessages.IncomingHttpRequest) => Record<string, any>;
