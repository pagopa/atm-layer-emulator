import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HeaderApp } from "../HeaderApp";
import { Ctx } from "../../../DataContext";

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("HeaderApp test", () => {
	test("Test render Header component with login false", () => {
		render(
			<Ctx.Provider value={{ logged: false, userEmail: "" }}>
				<BrowserRouter>
					<HeaderApp />
				</BrowserRouter>
			</Ctx.Provider>
		);
	});

	test("Test render Header component with login true", () => {

		const onLogoutMocked = jest.fn();

		render(
			<Ctx.Provider value={{ logged: true, clearAll: () => onLogoutMocked(), userEmail: "utente@prova.it" }}>
				<BrowserRouter>
					<HeaderApp />
				</BrowserRouter>
			</Ctx.Provider>
		);

		const exitButton = screen.getByTestId("exit-button-test")

		expect(screen.getByText("Benvenuto utente")).toBeInTheDocument();

		fireEvent.click(exitButton);
	});
});