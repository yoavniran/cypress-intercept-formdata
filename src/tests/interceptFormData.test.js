import interceptFormData from "../interceptFormData";
import getBodyAsString from "../getBodyAsString";
import getBoundary from "../getBoundary";
import { resultAppender } from "../appenders";
import defaultParsers from "../parsers";

vi.mock("../parsers", async () => {
	// const ps = await vi.importActual("../parsers")
	return { default: [vi.fn(), vi.fn(), vi.fn()] }; //
});

// vi.mock("../parsers");
vi.mock("../getBoundary");
vi.mock("../getBodyAsString");
vi.mock("../appenders");

describe("interceptFormData tests", () => {
	// let resultAppenderStub;

	// before(()=>{
	// 	sinon.stub(defaultParsers);
	// });

	// beforeEach(() => {
	// stubProp(getBoundary).returns("|");
	// stubProp(getBodyAsString).returns("b|o|d|y");
	// resultAppenderStub = stubProp(resultAppender);
	// });

	beforeEach(() => {
		getBoundary.mockReturnValue("|");
		getBodyAsString.mockReturnValue("b|o|d|y");
	});

	it("should parse form-data from request", () => {
		const request = {
			body: "test",
			headers: { "content-type": "multi" },
		};

		defaultParsers[0].mockReturnValueOnce(["first", "james"]);
		defaultParsers[1].mockReturnValueOnce(["second", "bob"]);

		resultAppender.mockImplementation((res, name, value) => {
			if (typeof res !== "string") {
				res = "";
			}

			res += `${name}|${value}|`;

			return res;
		});

		const result = interceptFormData(request);

		expect(result).to.eql("first|james|second|bob|");
		expect(defaultParsers[0]).toHaveBeenCalledTimes(4);
		expect(defaultParsers[1]).toHaveBeenCalledTimes(3);
	});
});
