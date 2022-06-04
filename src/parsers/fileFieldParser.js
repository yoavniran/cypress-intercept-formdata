const fileFieldParser = (part) => {
	// eslint-disable-next-line no-useless-escape
	const fileNameMatch = part.match(/name="([\w\[\]]+)"; filename="([\w.]+)"/m);
	return fileNameMatch ? [fileNameMatch[1], fileNameMatch[2]] : null;
};

export default fileFieldParser;
