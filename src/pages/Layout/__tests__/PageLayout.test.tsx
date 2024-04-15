import { BrowserRouter } from "react-router-dom";
import PageLayout from "../PageLayout";
import { Ctx } from "../../../DataContext";
import { themeApp } from "../../../assets/jss/themeApp";
import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import React from "react";

const originalFetch = global.fetch;

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => { });
	jest.spyOn(console, "warn").mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("PageLayout test", () => {

	test("Test render PageLayout component with loading false and no userEmail nor token", () => {
		const userEmail = jest.fn();
		render(
			<Ctx.Provider value={{ loading: false, userEmail }}>
				<BrowserRouter>
					<ThemeProvider theme={themeApp}>
						<PageLayout children={<React.Fragment />} />
					</ThemeProvider>
				</BrowserRouter>
			</Ctx.Provider>
		);
	});

	test("Test render PageLayout component with loading true and no userEmail with token", () => {
		const userEmail = { email: undefined };
		const setUserEmail = jest.fn();
		sessionStorage.setItem("jwt_emulator", "token");
		global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { email: "testEmail" },
            }),
        });
		render(
			<Ctx.Provider value={{ loading: true, userEmail, setUserEmail }}>
				<BrowserRouter>
					<ThemeProvider theme={themeApp}>
						<PageLayout children={<React.Fragment />} />
					</ThemeProvider>
				</BrowserRouter>
			</Ctx.Provider>
		);
		expect(global.fetch).toHaveBeenCalled();
	});
});
