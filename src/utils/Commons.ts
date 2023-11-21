import { DEFAULT_PATH_IMAGES } from "./Constants";

export function getCompletePathImage (image: string){
	const frontend_url = process.env.REACT_APP_URL_FE;
	const pathImg=frontend_url + DEFAULT_PATH_IMAGES+ image;
	console.log("path: " + pathImg);
	return pathImg;
}