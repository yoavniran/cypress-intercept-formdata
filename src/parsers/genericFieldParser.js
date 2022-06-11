//doesnt support dotsForObjectNotation (object-to-formdata)
const genericFieldParser = (part) => {
	let name, value;
	const fieldMatch = part.match(/; name="([\w-_]+)((\[[\w-_]+])*)/);

	if (fieldMatch) {
		name = fieldMatch[1];

		value = part
			.split(`\r\n`)
			.slice(3, -1)
			.join("");
	}

	return name ? [name, value, fieldMatch[2]] : null;
};

export default genericFieldParser;
