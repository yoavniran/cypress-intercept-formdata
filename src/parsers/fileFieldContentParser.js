import fileFieldParser from "./fileFieldParser";

const fileFieldContentParser = (part, options) => {
	let result = null;

	if (options.loadFileContent) {
		const parsedField = fileFieldParser(part);

		if (parsedField) {
			const [field, fileName] = parsedField;
			const ctMatch = part.match(/Content-Type: (\w*\/?[\w-_]*)\r\n\r\n/m);
			const contentType = ctMatch?.[1];

			if (contentType) {
				const fileContentStart = ctMatch.index + ctMatch[0].length;
				const fileContent = part.substring(fileContentStart, part.length - 2).trimEnd();

				const chars = Array.prototype
					.map.call(fileContent,
						(c, i) => fileContent.charCodeAt(i));

				const file = new File(
					[new Uint8Array(chars)],
					fileName,
					{ type: contentType },
				);

				result = [field, file];
			}
		}
	}

	return result;
};

export default fileFieldContentParser;

