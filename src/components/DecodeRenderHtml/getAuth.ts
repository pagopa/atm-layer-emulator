import { useContext, useRef } from "react";
import fetchAuth from "../../hook/fetchAuth";
import { Ctx } from "../../DataContext";

export const getAuth = () => {
	const auth = new Promise((resolve) => {
		const { abortController } = useContext(Ctx);
		const headers={
			"Authorization": localStorage.getItem("jwt_emulator") ?? "",
			"Content-Type": "application/x-www-form-urlencoded"
		};
		const formBody = new URLSearchParams();
		formBody.set("grant_type", "client_credentials");
		formBody.set("scope", "uat/tasks");
        
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