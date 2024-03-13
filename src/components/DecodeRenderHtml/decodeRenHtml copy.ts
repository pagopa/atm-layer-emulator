/* eslint-disable quotes */

import "./DecodeRenderHtml.css";

const getTemplate = (template: any) => {
	const parser = new DOMParser();
	const parsedHtml = parser.parseFromString(template, "text/html");
	const body = parsedHtml.getElementsByTagName("body")[0];
	return body;
};

export function decodeRenderHtml(template: any) {
	return getTemplate(template);
}