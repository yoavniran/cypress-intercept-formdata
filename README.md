# cypress-intercept-formdata (CIFD)

<p align="center">
    <a href="LICENSE.md">
       <img src="https://img.shields.io/github/license/yoavniran/cypress-intercept-formdata?color=blue&style=plastic" alt="MIT License"/>
    </a>
    <a href="https://badge.fury.io/js/cypress-intercept-formdata">
        <img src="https://badge.fury.io/js/cypress-intercept-formdata.svg" alt="npm version" height="20">
    </a>
</p>

This package is intended to be used with [Cypress.io](https://www.cypress.io/) [intercept](https://docs.cypress.io/api/commands/intercept.html) command.

As of version 6.2 or 6.3 the request.body accessed from the intercept is an ArrayBuffer for multipart/form-data requests.

This makes it difficult to work with the body of the request and make assertions on it.

CIFD makes it easy to use the multipart body in your specs.

## Installation

```shell
#Yarn: 
   $ yarn add cypress-intercept-formdata

#NPM:
   $ npm i cypress-intercept-formdata
``` 

## Usage

Add to your commands file:

```javascript

//cypress/support/commands.js

import "cypress-intercept-formdata";

//...
```

Then in your spec:

```javascript

cy.intercept("POST", "http://localhost:8888/api/test", {
	statusCode: 200,
	body: { success: true },
}).as("uploadRequest");

//...

cy.wait("@uploadRequest")
	.interceptFormData((formData) => {
		expect(formData["foo"]).to.eq("bar");
	});

```

If you have file(s) uploaded as part of the request they will be available in the formData object as well:
The value is the file name

```javascript

cy.wait("@uploadRequest")
	.interceptFormData((formData) => {
		expect(formData["file"]).to.eq("fileName.txt");
	});
```

Multiple files are also supported:

```javascript
cy.wait("@uploadRequest")
	.interceptFormData((formData) => {
		expect(formData["file[0]"]).to.eq("fileName1.txt");
		expect(formData["file[1]"]).to.eq("fileName2.txt");
	});
```

### Use inside intercept routeHandler

Cypress intercept command accepts a [routeHandler](https://docs.cypress.io/api/commands/intercept.html#Intercepting-a-request)

If you want to inspect/assert on the body from the handler, you can import the interceptFormData directly and call it like this:

```javascript
import { interceptFormData } from "cypress-intercept-formdata";

//...

cy.intercept("POST", "http://localhost:8888/api/test", (req) => {
  const formData = interceptFormData(req);
  
  expect(formData["first_name"]).to.eq("James");
});

```

## Testing this Library

In terminal 1:

```bash
yarn serve
```

In terminal 2:

```bash
yarn cy:run
```

OR

```bash
yarn cy:open
```
