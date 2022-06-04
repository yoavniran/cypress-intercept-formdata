const getBoundary = (headers) => {
	const contentType = headers["content-type"];
	const boundaryMatch = contentType.match(/boundary=([\w-]+)/);
	return boundaryMatch && boundaryMatch[1];
};

export default getBoundary;
