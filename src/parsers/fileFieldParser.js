const fileFieldParser = (part) => {
	// eslint-disable-next-line no-useless-escape
	const fileNameMatch = part.match(/name="([\w-_\[\]]+)"; filename="([\w\-_.]+)"/m);
	return fileNameMatch ? [fileNameMatch[1], fileNameMatch[2]] : null;
};

export default fileFieldParser;
