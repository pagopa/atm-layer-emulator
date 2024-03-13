/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { DEFAULT_PATH_IMAGES } from "./Constants";

export function getCompletePathImage (image: string){
	const frontend_url = process.env.REACT_APP_URL_FE;
	const pathImg=frontend_url + DEFAULT_PATH_IMAGES+ image;
	console.log("path: " + pathImg);
	return pathImg;
}

export const resetErrors = (errors: any, setErrors: any, field: string | number) => {
	if (field) {
		// reset errore specifico field
		if (errors[field]) {
			setErrors((prevErrors: { [x: string]: any }) => {
				delete prevErrors[field];
				return { ...prevErrors };
			});
		}
	} else {
		// reset di tutti gli errori dei field
		setErrors((prevErrors: any) => {
			let newErr: any;
			for (let e of Object.keys(prevErrors)) {
				delete newErr[e];
				newErr = { ...newErr };
			}
			return newErr;
		});
	}
};