import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";

describe ("App Tests", () => {
	test("Test App without jwt in sessionStorage", () => {

		sessionStorage.setItem("tempLog", "fakeToken");
		sessionStorage.setItem("jwt_emulator", "fakeToken");
		sessionStorage.setItem("debugOn", "true");
	
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
	});
	
	test("Test App with jwt in sessionStorage", () => {
	
		sessionStorage.setItem("tempLog", "fakeToken");
		sessionStorage.setItem("jwt_emulator", "fakeToken");
		sessionStorage.setItem("debugOn", "false");
		localStorage.setItem("jwt_console", "prova");
		localStorage.setItem("debugOn", "prova");
	
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
	});


	test("Render Homepage with jwt in sessionStorage and test log out", () => {
	
		sessionStorage.setItem("jwt_emulator", "fakeToken");
		sessionStorage.setItem("recordParams", "fakeRecordParams");
		sessionStorage.setItem("recordParamsAssociated", "fakeRecordParamsAssociated");
		render(
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Simulatore ATM")).toBeInTheDocument();
		fireEvent.click(screen.getByText("Esci"));
		expect(screen.getByText("Accedi")).toBeInTheDocument();
		// expect(sessionStorage.getItem("jwt_emulator")).toBe(undefined);
		// expect(sessionStorage.getItem("recordParams")).toBe(undefined);
		// expect(sessionStorage.getItem("recordParamsAssociated")).toBe(undefined);

	});

});