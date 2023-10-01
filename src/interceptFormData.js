import DEFAULTS from "./defaults";
import getBodyAsString from "./getBodyAsString";
import getBoundary from "./getBoundary";
import defaultParsers from "./parsers";
import { resultAppender } from "./appenders";

const parse = (part, parsers, options) => {
	let parsed = null,
		index = 0;

	while (!parsed && index < parsers.length) {
		parsed = parsers[index](part, options);
		index += 1;
	}

	return parsed || [];
};

const getFormDataFromRequest = (body, boundary, options) => {
	const decoded = getBodyAsString(body);
	const parts = decoded.split(boundary);

	return parts.reduce((res, p) => {
		const [name, value, path] = parse(p, defaultParsers, options);

		if (name) {
			res = resultAppender(res, name, value, path);
		}

		return res;
	}, {});
};

const interceptFormData = (request, options = {}) => {
	const usedOptions = {...DEFAULTS, ...options};
	const { body, headers } = request;
	const boundary = getBoundary(headers);

	return getFormDataFromRequest(body, boundary, usedOptions);
};

export default interceptFormData;
