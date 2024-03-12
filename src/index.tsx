import{ createRoot } from "react-dom/client";
import "./index.css";
// import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { DecodeRenderHtml } from "./components/DecodeRenderHtml/DecodeRenderHtml";

const root = createRoot(
  document.getElementById("root") as HTMLElement
);

// const reader = createRoot(document.getElementById("reader") as HTMLElement);

// Rendering del componente separato usando il root

// reader.render(
// 	<BrowserRouter basename="/emulator">
// 		{/* <CssBaseline /> */}
// 		<DecodeRenderHtml />
// 	</BrowserRouter>);
	
root.render(
	<BrowserRouter basename="/emulator">
		<App />
	</BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();