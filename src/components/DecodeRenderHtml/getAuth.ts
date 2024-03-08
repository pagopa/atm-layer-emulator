import { useRef } from "react";
import fetchAuth from "../../hook/fetchAuth";

const abortController = useRef(new AbortController());
export const getAuth=()=>{
	const auth = new Promise((resolve) => {
		const headers={
			"Content-Type": "application/x-www-form-urlencoded"
		};
		const formBody = new URLSearchParams();
		formBody.set("grant_type", "client_credentials");
		formBody.set("scope", "uat/tasks");
		// const body= {
		// 	'grant_type':'client_credentials',
		// 	'scope':'uat/tasks'
		// };
        
		void fetchAuth({ abortController, headers, body:formBody })().then((dataObj:any) => {
			if (dataObj) {
				resolve({
					data: dataObj,
					type: "SUCCES",
				});
			} else {resolve({ type: "error" });} // procedo comunque, altrimenti avrei lanciato reject
			console.log("Auth res",dataObj);
		});
	});
    
	auth.then(({ data}:any) => {
		// tempFastDataValues = {
		// 	...tempFastDataValues,
		// 	...data
		// 	//TO DO GESTIRE CORRETTAMENTE RISPOSTA
		// };
		console.log("Auth res",data);
		return data;
	})	.catch((e) => e);
};