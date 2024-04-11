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


// funzione paginazione array
function paginate( array: Array<Element>, pageNumber:number, pageSize:number) {
	return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) as Array<Node>;
};

export function getPaginationFragment(listItems: Array<Element>, pageIndex:number, pageSize:number){
	const paginationArray=paginate(Array.from(listItems), pageIndex, pageSize);
	listItems.forEach(el => el.remove());
	const frag = document.createDocumentFragment();
	for (let i = 0; i < paginationArray.length; ++i) {
		frag.appendChild(paginationArray[i]);
	}
	// hiding prevLiButton from page 1
	if (pageIndex === 1){
		document?.getElementById("prevLiButton")?.classList.add("hidden");
	} else {
		document?.getElementById("prevLiButton")?.classList.remove("hidden");
	}
	// hiding nextLiButton from the last page
	if (paginationArray.length < 4 || (pageIndex === listItems.length/pageSize && listItems.length%pageSize===0)){
		document?.getElementById("nextLiButton")?.classList.add("hidden");
	} else {
		document?.getElementById("nextLiButton")?.classList.remove("hidden");
	}
	return frag;
};


export function positionPaginatedButtons () {
	const displayedItems=document.querySelectorAll("#menu > li");
	const paginatedLiPositions = ["S1","S2","S5","S6"];
	displayedItems.forEach((item, i) => item.setAttribute("data-fdk",paginatedLiPositions[i]));
};


export function positionUnpaginatedButtons (touchInterface:boolean) {
	if (!touchInterface){
		const listItems=document.querySelectorAll("#menu > li");
		const liPositions = ["S1","S2","S3","S5","S6","S7"];
		listItems.forEach((item, i) => item.setAttribute("data-fdk",liPositions[i]));
	}
};


export function createNextLiButton () {
	const nextLiButton = document.createElement("button");
	nextLiButton.id="nextLiButton";
	nextLiButton.innerHTML = "Iniziative successive";
	nextLiButton.setAttribute("data-fdk","S7");
	nextLiButton.setAttribute("data-testid","nextLiTestButton");
	return nextLiButton;
}

export function createPrevLiButton () {
	const prevtLiButton = document.createElement("button");
	prevtLiButton.id="prevLiButton";
	prevtLiButton.innerHTML = "Iniziative precedenti";
	prevtLiButton.setAttribute("data-fdk","S3");
	prevtLiButton.setAttribute("data-testid","prevLiTestButton");
	return prevtLiButton;
}


export function addHeaderRow (bodyHtml : HTMLBodyElement) {
	const headerRow = document.createElement("div");
	headerRow.classList.add("mui-row");
	headerRow.id = "headerSection";
	const logoElement = bodyHtml?.querySelector("#logo");
	if (logoElement) {
		const logoColumn = document.createElement("div");
		logoColumn.classList.add("mui-col-md-6");
		logoColumn.appendChild(logoElement);
		headerRow.appendChild(logoColumn);
	}
	const descElement = bodyHtml?.querySelector("h1");
	if (descElement) {
		const descColumn = document.createElement("div");
		descColumn.classList.add("mui-col-md-6");
		descColumn.appendChild(descElement);
		headerRow.appendChild(descColumn);
	}
	bodyHtml?.insertBefore(headerRow, bodyHtml.firstChild);
	return bodyHtml;
}