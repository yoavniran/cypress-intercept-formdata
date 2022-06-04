import interceptFormData from "../interceptFormData";
import * as getBodyAsString from "../getBodyAsString";
import * as getBoundary from "../getBoundary";
import * as resultAppender from "../appenders/resultAppender";

import defaultParsers from "../parsers";

describe("interceptFormData tests", () => {
	let resultAppenderStub;

	beforeEach(() => {
		stubProp(getBoundary).returns("|");
		stubProp(getBodyAsString).returns("b|o|d|y");
		resultAppenderStub = stubProp(resultAppender);

		sinon.stub(defaultParsers);
	});

	it("should parse form-data from request", () => {
		const request = {
			body: "test",
			headers: { "content-type": "multi" },
		};

		defaultParsers[0].onFirstCall().returns(["first", "james"]);
		defaultParsers[1].onFirstCall().returns(["second", "bob"]);

		resultAppenderStub.callsFake((res, name, value) => {
			if (typeof res !== "string") {
				res = "";
			}

			res += `${name}|${value}|`;

			return res;
		});

		const result = interceptFormData(request);

		expect(defaultParsers[0].callCount).to.eq(4);
		expect(defaultParsers[1].callCount).to.eq(3);

		expect(result).to.eq("first|james|second|bob|");
	});
});
