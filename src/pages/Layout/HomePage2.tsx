import React from "react";
import { useContext } from "react";
import ReactDOM from "react-dom/client";
import { Ctx } from "../../DataContext";
import { decodeRenderHtml } from "../../components/DecodeRenderHtml/decodeRenHtml";


export const HomePage2 = () => {

	const context = useContext(Ctx);

	
	const reader = ReactDOM.createRoot(
			document.getElementById("reader") as HTMLElement
	);
		  
	reader.render(
			  <React.StrictMode>		
				  {/* <CssBaseline /> */}
				  {decodeRenderHtml()}
			  </React.StrictMode>
	);
			
	return <React.Fragment></React.Fragment>;
	
};
