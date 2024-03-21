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

export const wrapElementInMuiRow = (element: HTMLElement, rowStyleClass?: string,) => {
	const newRow = document.createElement("div");
	newRow.classList.add("mui-row");
	if(rowStyleClass){newRow.classList.add(rowStyleClass);}
	newRow.appendChild(element);
	return newRow;
};

export const wrapElementInMuiCol = (width : string, element: HTMLElement, colStyleClass?: string) => {
	const newCol = document.createElement("div");
	newCol.classList.add("mui-col-"+width);
	if (colStyleClass) {newCol.classList.add(colStyleClass);}
	newCol.appendChild(element);
	return newCol;
};

export const wrapElementInMuiColAndRow = (width : string, element: HTMLElement, rowStyleClass?: string, colStyleClass?: string) => {
	const newRow = document.createElement("div");
	newRow.classList.add("mui-row");
	if(rowStyleClass){newRow.classList.add(rowStyleClass);}
	const newCol = document.createElement("div");
	newCol.classList.add("mui-col-"+width);
	if(colStyleClass){newCol.classList.add(colStyleClass);}
	newCol.appendChild(element);
	newRow.appendChild(newCol);
	return newRow;
};