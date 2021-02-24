# cypress-intercept-formdata

This package is intended to be used with Cypress.io intercept command.

As of version 6.3+ the request.body accessed from the intercept is an ArrayBuffer for multipart/form-data requests.

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
}).as(alias);

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
