import React from "react";
import ReactDOM from "react-dom/client";
import { decodeRenderHtml } from "../../components/DecodeRenderHtml/decodeRenHtml";


export const HomePage2 = () => {

	
	const reader = ReactDOM.createRoot(
			document.getElementById("reader") as HTMLElement
	);
		  
	reader.render(
			  <React.StrictMode>		
				  {/* <CssBaseline /> */}
				  {decodeRenderHtml()}
			  </React.StrictMode>
	);
			
	return <React.Fragment/>;
	
};
