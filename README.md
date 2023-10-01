# cypress-intercept-formdata (CIFD)

<p align="center">
    <a href="LICENSE.md">
       <img src="https://img.shields.io/github/license/yoavniran/cypress-intercept-formdata?color=blue&style=plastic" alt="MIT License"/>
    </a>
    <a href="https://www.npmjs.com/package/cypress-intercept-formdata">
        <img src="https://badge.fury.io/js/cypress-intercept-formdata.svg" alt="npm version" height="20">
    </a>
    <a href="https://github.com/yoavniran/cypress-intercept-formdata/actions/workflows/test.yml">
        <img src="https://github.com/yoavniran/cypress-intercept-formdata/actions/workflows/test.yml/badge.svg"/> 
    </a>  
    <a href="https://codecov.io/gh/yoavniran/cypress-intercept-formdata">
      <img src="https://codecov.io/gh/yoavniran/cypress-intercept-formdata/branch/master/graph/badge.svg" alt="codecov status"/>
    </a>
    <img src="https://img.shields.io/npm/dm/cypress-intercept-formdata.svg?style=plastic&color=blue&label=monthly%20downloads"/>
    <img src="https://shields.io/npm/dt/cypress-intercept-formdata.svg?style=plastic&color=green&label=total+downloads"/>
</p>

This package is intended to be used with [Cypress.io](https://www.cypress.io/) [intercept](https://docs.cypress.io/api/commands/intercept.html) command.

As of version 6.2 or 6.3 the request.body accessed from the intercept is an ArrayBuffer for multipart/form-data requests.

This makes it difficult to work with the body of the request and make assertions on it.

CIFD makes it easy to use the multipart body in your specs.

## Installation

```shell
#pnpm: 
   $ pnpm add cypress-intercept-formdata

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

### Uploading Files

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
		expect(formData["file"][0]).to.eq("fileName1.txt");
		expect(formData["file"][1]).to.eq("fileName2.txt");
	});
```

#### File Content

By default, CIFD simply adds the file name being uploaded to the formData object. If you'd like to
assert more deeply on the file(s) being uploaded, you can set _options.loadFileContent_ to true:


```javascript
  cy.wait("@submitForm")
    .interceptFormData((formData) => {
        expect(formData["file"]).to.be.instanceof(File);
        expect(formData["file"]).to.have.property("type", "image/jpeg");
        expect(formData["file"].size).to.be.eq(2551829);
    }, { loadFileContent: true });
```
> Multiple files are supported as well.


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
pnpm serve
```

In terminal 2:

```bash
pnpm cy:run
```

OR

```bash
pnpm cy:open
```

### Testing while developing

In terminal 3:

```bash
pnpm watch
```
