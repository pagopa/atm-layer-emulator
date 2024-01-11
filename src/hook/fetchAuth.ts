/* eslint-disable arrow-body-style */
import fetch from "./useFetch";

const endpoint="https://pagopa-uat-atm-layer-m2m.auth.eu-south-1.amazoncognito.com";
const urlEndpoint = "/oauth2/token";

const fetchAuth = ({abortController, headers, body}:any) => {
	return async () => {
		const fetchFromServer = fetch(endpoint);
		const data = await fetchFromServer({urlEndpoint, method: "POST", body, abortController, headers});
		return data;
	};
};

export default fetchAuth;
