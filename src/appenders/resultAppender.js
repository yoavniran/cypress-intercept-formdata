const resultAppender = (result, name, value, path) => {
	if (!path) {
		result[name] = value;
	} else {
		let parent = result;

		[`[${name}]`]
			.concat(path.match(/\[\w+]/g))
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

				// console.log("WORKING ON PATH ", { path, pathPart, cleanName, cleanChild, isChildArray, allPaths, parent, result});
			});
	}

	return result;
};

export default resultAppender;
