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

export const createMuiRow = () => {
	const newRow = document.createElement("div");
	newRow.classList.add("mui-row");
	return newRow;
};

export const createMuiCol = (width : string) => {
	const newCol = document.createElement("div");
	newCol.classList.add("mui-col-"+width);
	return newCol;
};

export const wrapElementInMuiRow = (element: HTMLElement) => {
	const newRow = document.createElement("div");
	newRow.classList.add("mui-row");
	newRow.appendChild(element);
	return newRow;
};

export const wrapElementInMuiCol = (width : string, element: HTMLElement) => {
	const newCol = document.createElement("div");
	newCol.classList.add("mui-col-"+width);
	newCol.appendChild(element);
	return newCol;
};

export const wrapElementInMuiColAndRow = (width : string, element: HTMLElement) => {
	const newRow = document.createElement("div");
	newRow.classList.add("mui-row");
	const newCol = document.createElement("div");
	newCol.classList.add("mui-col-"+width);
	newCol.appendChild(element);
	newRow.appendChild(newCol);
	return newRow;
};