const DecodeRenderHtml = (template: any) => {

	const getTemplate = (template: any) => {
		const parser = new DOMParser();
		const parsedHtml = parser.parseFromString(template, "text/html");
		const body = parsedHtml.getElementsByTagName("body")[0];
		return body;
	};

	return getTemplate(template);
};

export default DecodeRenderHtml;

