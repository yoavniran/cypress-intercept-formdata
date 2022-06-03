import { expect } from "chai";
import sinon from "sinon";

global.expect = expect;
global.sinon = sinon;

global.stubProp = (obj, property = "default") => sinon.stub(obj, property);


afterEach(() =>{
	sinon.restore();
});
