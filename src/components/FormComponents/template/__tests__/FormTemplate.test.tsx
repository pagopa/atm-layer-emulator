import { BrowserRouter } from "react-router-dom"
import FormTemplate from "../FormTemplate"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@mui/material/styles";
import { themeApp } from "../../../../assets/jss/themeApp";

describe("Test FormTemplate component", () => {
    test("Test maxWidth is '75%' when window width is greater than md breakpoint", () => {
        const handleSubmit = jest.fn();
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: themeApp.breakpoints.values.md + 100 });
        const { container } = render(
            <BrowserRouter>
                <ThemeProvider theme={themeApp}>
                    <FormTemplate handleSubmit={handleSubmit} />
                </ThemeProvider>
            </BrowserRouter>
        );
        const boxElement = container.firstChild;
        expect(boxElement).toHaveStyle({ maxWidth: '75%' });
    });

    test("Test maxWidth is '100%' when window width is less than or equal to md breakpoint", () => {
        const handleSubmit = jest.fn();
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: themeApp.breakpoints.values.md });
        const { container } = render(
            <BrowserRouter>
                <ThemeProvider theme={themeApp}>
                    <FormTemplate handleSubmit={handleSubmit} />
                </ThemeProvider>
            </BrowserRouter>
        );
        const boxElement = container.firstChild;
        expect(boxElement).toHaveStyle({ maxWidth: '100%' });
    });
})