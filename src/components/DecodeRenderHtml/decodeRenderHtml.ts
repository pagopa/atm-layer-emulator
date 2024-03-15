import { base64_decode } from "../../commons/decode";
import "./DecodeRenderHtml.css";


const getTemplate = (template: any) => {

	const parser = new DOMParser();
	const parsedHtml = parser.parseFromString(template, "text/html");
	const body = parsedHtml.getElementsByTagName("body")[0];
	return body;
};

export function decodeRenderHtml(template: any) {
	const element= base64_decode(template);
	return getTemplate(element);
}