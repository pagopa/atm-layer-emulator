import fetch from "../useFetch";

export function fetchRequest ({urlEndpoint, method = "GET", body, abortController, queryString, response, headers, isFormData}:any){
	return async () => {
		const fetchFromServer = fetch();
		const data = await fetchFromServer({
			urlEndpoint: queryString ? `${urlEndpoint}${queryString}` : urlEndpoint, 
			method, 
			body, 
			abortController, 
			headers, 
			isFormData
		});
		return handleResponse({response, data});
	};
}

export function handleResponse({response,data }:any){
	if(data?.status) {
		return data;
	// }
	// else if(data?.values) {
	// 	return data.success ? data.valuesObj.values : null;
	}else{
		return  data.success ? data.valuesObj : null;
	}
}