/// <reference types="cypress" />
import { Interception } from 'cypress/types/net-stubbing';

declare namespace Cypress {
  interface Chainable<Subject = Interception> {
    interceptFormData(cb: (formData: Record<string, any>) => void): Chainable<Subject>;
  }
}
