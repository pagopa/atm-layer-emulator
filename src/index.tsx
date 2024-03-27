import{ createRoot } from "react-dom/client";
import "./index.css";
// import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
	<BrowserRouter basename="/emulator">
		<App />
	</BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();