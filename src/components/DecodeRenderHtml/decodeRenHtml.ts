/* eslint-disable quotes */

import parse from "html-react-parser";
import "./DecodeRenderHtml.css";
import { base64_decode } from "../../commons/decode";
import resp from "./resp.json";

// const template= resp?.task?.template?.content;


const getTemplate=(element:string)=>{
	
	const parser = new DOMParser();
	const parsedHtml = parser.parseFromString(element, "text/html");
	const body = parsedHtml.getElementsByTagName("body");
	// console.log(document.querySelector("body")?, parsedHtml, body);
	const bodyText = body[0].innerHTML;
	return bodyText? parse(bodyText): "<div />";
};


export function decodeRenderHtml(template:any) : string | React.JSX.Element | Array<React.JSX.Element> {
	const element= base64_decode(template);
	return getTemplate(element);
}