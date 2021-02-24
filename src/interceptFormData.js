const getFormDataFromRequest = (body, boundary) => {
	const decoder = new TextDecoder();
	const decoded = decoder.decode(body);
	const parts = decoded.split(boundary);

	return parts.reduce((res, p) => {
		// eslint-disable-next-line no-useless-escape
		const fileNameMatch = p.match(/name="([\w\[\]]+)"; filename="([\w.]+)"/m);

		if (fileNameMatch) {
			res[fileNameMatch[1]] = fileNameMatch[2];
		} else {
			const fieldMatch = p.match(/; name="([\w-]+)"/);
			const fieldName = fieldMatch && fieldMatch[1];

			if (fieldName) {
				res[fieldName] = p.split(`\r\n`)[3];
			}
		}

		return res;
	}, {});
};

const interceptFormData = (request) => {
	const { body, headers } = request;
	const contentType = headers["content-type"];
	const boundaryMatch = contentType.match(/boundary=([\w-]+)/);
	const boundary = boundaryMatch && boundaryMatch[1];

	return getFormDataFromRequest(body, boundary);
};

export default interceptFormData;
