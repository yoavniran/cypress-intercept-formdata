const getBodyAsString = (body) => {
	let str;

	if (typeof body === "string") {
		str = body;
	} else {
		const decoder = new TextDecoder();
		str = decoder.decode(body);
	}

	return str;
};

export default getBodyAsString;
