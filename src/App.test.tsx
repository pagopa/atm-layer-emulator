import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe ("App Tests", () => {
	test("Test App without jwt in sessionStorage", () => {

		sessionStorage.setItem("tempLog", "fakeToken");
		sessionStorage.setItem("jwt_emulator", "fakeToken");
		sessionStorage.setItem("debugOn", "debugOn");
	
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
	});
	
	test("Test App with jwt in sessionStorage", () => {
	
		sessionStorage.setItem("tempLog", "fakeToken");
		sessionStorage.setItem("jwt_emulator", "fakeToken");
		sessionStorage.setItem("debugOn", "debugOn");
		localStorage.setItem("jwt_console", "prova");
		localStorage.setItem("debugOn", "prova");
	
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
	});
});