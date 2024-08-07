import ROUTES from "../routes";

/* eslint-disable functional/no-let */
export default function useFetch(endPoint?: string | undefined) {
	// endpoint per test di ingrazione interni

	const SERVER_API_ORIGIN = endPoint&& endPoint!=="" ? endPoint : process.env.REACT_APP_BACKEND_URL;
	const CODE_SUCCESS = [200, 201, 202, 203] ;
	const token = sessionStorage.getItem("jwt_emulator");

	const fetchFromServer = async ({
		urlEndpoint,
		method,
		body,
		abortController,
		headers,
		isFormData
	}: any) => {
		let data;
		let status;
		let response;
		

		let headerRequest = {
			"Authorization": token ? token : "",
			"Accept": "application/json",
		};

		if (headers) {
			headerRequest = {
				...headerRequest,
				...headers
			};
		}

		const options: any = isFormData
			? {
				method, //  POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, *cors, same-origin
				// credentials: "include",
				signal: abortController?.current?.signal,
				// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				headers: {...headerRequest},
				// redirect: "follow", // manual, *follow, error
				// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body, // body data type must match "Content-Type" header
		  }
			: 	(method === "POST" || method === "PUT")
				? {
					method, // *GET, POST, PUT, DELETE, etc.
					mode: "cors", // no-cors, *cors, same-origin
					// credentials: "include",
					signal: abortController?.current?.signal,
					// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
					headers: { ...headerRequest },
					// redirect: "manual", // manual, *follow, error
					// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					body: body ? JSON.stringify(body) : JSON.stringify(""), // body data type must match "Content-Type" header
				}
				: {
					method, // *GET, POST, PUT, DELETE, etc.
					mode: "cors", // no-cors, *cors, same-origin
					// credentials: "include",
					signal: abortController?.current?.signal,
					// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
					headers: { ...headerRequest },
					// redirect: "manual", // manual, *follow, error
					// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				};

		const maxRetries = 2;
		const retryDelay = 0;
		let retryCount = 0;
		try {

			while (retryCount <= maxRetries) {
				response = await fetch(
					SERVER_API_ORIGIN + urlEndpoint,
					options
				).catch((e) => {
					console.error(e);
				});
				status = response?.status;
				// TOKEN SCADUTO
				if (!response) {
				// window.location.reload();
					data = {
						valuesObj: { message: "Errore durante la chiamata all'api", status },
						success: false,
					};
					break;
				}
				if (status === 401) {
					window.location.assign(process.env.REACT_APP_HOME_PATH+ROUTES.LOGIN);
					return;
				}
				if (status === 204) {
					data = { valuesObj: { message: "Dati vuoti" }, status, success: true }; // valuesObj conterrà il messaggio di errore
					break;
				} else if (status === 418){
					window.location.assign(process.env.REACT_APP_HOME_PATH+ROUTES.NO_ASSOCIATION);
					break;
				} else if (status === 209){
					window.location.assign(process.env.REACT_APP_HOME_PATH+ROUTES.ERROR_PAGE);
					break;
				} else if (status && !(CODE_SUCCESS.includes(status)) && status !== 206) {
					const errorResponse = await response?.json();
					data = { valuesObj: errorResponse, status, success: false }; // valuesObj conterrà il messaggio di errore
					break;
				} else if (status === 202){
					if (retryCount === maxRetries) {
						window.location.assign(process.env.REACT_APP_HOME_PATH+ROUTES.TIMEOUT_PAGE);
					}
					retryCount++;
					data= await new Promise((resolve) => setTimeout(resolve, retryDelay));
				} else {
					data = await response?.json(); // parses JSON response into native JavaScript objects
					data = { valuesObj: data, status, success: true }; // CODE_SUCCESS 200/206
					break;
				}
			}
		} catch (error) {
			data = {
				valuesObj: { message: `Errore durante la useFetch${error}` }, // valuesObj conterrà il messaggio di errore
				success: false,
			};
		}
		// return {response, data};
		return data;
	};

	return fetchFromServer;
}
