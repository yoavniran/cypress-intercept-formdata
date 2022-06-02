const fileFieldParser = (part) => {
	const fileNameMatch = part.match(/name="([\w[]]+)"; filename="([\w.]+)"/m);
	return fileNameMatch ? [fileNameMatch[1], fileNameMatch[2]] : null;
};

export default fileFieldParser;
