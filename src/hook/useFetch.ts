/* eslint-disable functional/no-let */
export default function useFetch(endPoint: string) {
	// endpoint per test di ingrazione interni

	// const SERVER_API_ORIGIN = endPoint ? endPoint : process.env.REACT_APP_BACKEND_URL;
	const SERVER_API_ORIGIN = endPoint ? endPoint : window.BACKEND_URL;
	const CODE_SUCCESS = 200;

	const fetchFromServer = async ({
		urlEndpoint,
		method,
		body,
		abortController
	}:any) => {
		let data; 
		let status;
		const headers= {
			"Content-Type": "application/json"
		};
		
		const options:any = 
		
			 (method === "POST" || method === "PUT")
			 	? {
			 		method, // *GET, POST, PUT, DELETE, etc.
			 		mode: "cors", // no-cors, *cors, same-origin
			 		credentials: "include",
			 		signal: abortController?.current?.signal,
			 		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			 		headers: {...headers},
			 		redirect: "manual", // manual, *follow, error
			 		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			 		body: body ? JSON.stringify(body) : JSON.stringify(""), // body data type must match "Content-Type" header
			  }
			 	: {
			 		method, // *GET, POST, PUT, DELETE, etc.
			 		mode: "cors", // no-cors, *cors, same-origin
			 		credentials: "include",
			 		signal: abortController?.current?.signal,
			 		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			 		headers: {...headers},
			 		redirect: "manual", // manual, *follow, error
			 		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			  };

		
		try {
			const response = await fetch(
				SERVER_API_ORIGIN + urlEndpoint,
				options
			).catch((e) => {
				console.error(e);
			});
			status = response?.status;
			// TOKEN SCADUTO
			if (
				!response ||
				(response.status === 0 && response.type === "opaqueredirect") ||
				response.status === 302
			) {
				window.location.reload();
			}
			if (status === 204) {
				data = { valuesObj: { message: "Dati vuoti" }, status, success: true }; // valuesObj conterrà il messaggio di errore
			} else if (status !== CODE_SUCCESS && status !== 206) {
				data = { valuesObj: { message: "Errore" }, status, success: false }; // valuesObj conterrà il messaggio di errore
			} else {
				
				data = await response?.json(); // parses JSON response into native JavaScript objects
				data = { valuesObj: data, status, success: true }; // CODE_SUCCESS 200/206
				
			}
		} catch (error) {
			data = {
				valuesObj: { message: "Errore durante la useFetch" }, // aluesObj conterrà il messaggio di errore
				success: false,
			}; 
		}
		// return {data, status};
		return data;
	};

	return fetchFromServer;
}
