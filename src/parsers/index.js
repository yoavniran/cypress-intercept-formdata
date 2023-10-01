/* istanbul ignore file */
import fileFieldParser from "./fileFieldParser";
import genericFieldParser from "./genericFieldParser";
import fileFieldContentParser from "./fileFieldContentParser";

const parsers = [
	fileFieldContentParser,
	fileFieldParser,
	genericFieldParser,
];

export default parsers;
