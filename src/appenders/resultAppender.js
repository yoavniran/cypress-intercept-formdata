const resultAppender = (result, name, value, path) => {
	if (!path) {
			result[name] = result[name] ?
				[].concat(result[name], value) : value;
	} else {
		let parent = result;

		[`[${name}]`]
			.concat(path.match(/\[[\w-_]+]/g))
			.forEach((pathPart, index, allPaths) => {
				const cleanName = pathPart.replace(/[\][]/g, "");
				//look ahead to determine the type of the "child"
				const cleanChild = allPaths[index + 1]?.replace(/[\][]/g, "");
				const isChildArray = !isNaN(cleanChild);

				if (!parent[cleanName]) {
					(parent[cleanName] = (isChildArray ? [] : {}));
				}

				if (allPaths.length - index === 1 ) {
					parent[cleanName] = value;
				} else {
					parent = parent[cleanName];
				}
			});
	}

	return result;
};

export default resultAppender;
