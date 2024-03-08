export function base64_decode(base64: string) {  
	// // eslint-disable-next-line functional/immutable-data
	// window.Buffer = Buffer;    
	// const back =  JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
	const decoded= atob(base64);
	// console.log(decoded);
	return decoded;
}

export function base64_encode(htmlText: string) {  
	const encoded= btoa(htmlText);
	// console.log(encoded);
	return encoded;
}