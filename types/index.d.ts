/// <reference types="cypress" />
import { CyHttpMessages } from "cypress/types/net-stubbing";

export type CifdOptions = {
	loadFileContent: boolean,
};

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      interceptFormData(cb: (formData: Record<string, any>) => void, options?: CifdOptions): Chainable<Subject>;
    }
  }
}

export const interceptFormData: (request: CyHttpMessages.IncomingHttpRequest, options?: CifdOptions) => Record<string, any>;
