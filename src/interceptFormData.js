import getBodyAsString from "./getBodyAsString";
import getBoundary from "./getBoundary";
import defaultParsers from "./parsers";
import { resultAppender } from "./appenders";

const parse = (part, parsers) => {
	let parsed = null,
		index = 0;

	while (!parsed && index < parsers.length) {
		parsed = parsers[index](part);
		index += 1;
	}

	return parsed || [];
};

const getFormDataFromRequest = (body, boundary) => {
	const decoded = getBodyAsString(body);
	const parts = decoded.split(boundary);

	return parts.reduce((res, p) => {
		const [name, value, path] = parse(p, defaultParsers);

		if (name) {
			res = resultAppender(res, name, value, path);
		}

		return res;
	}, {});
};

const interceptFormData = (request) => {
	const { body, headers } = request;
	const boundary = getBoundary(headers);

	return getFormDataFromRequest(body, boundary);
};

export default interceptFormData;
