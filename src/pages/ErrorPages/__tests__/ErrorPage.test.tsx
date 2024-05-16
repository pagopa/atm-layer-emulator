import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Error Page Tests", () => {
    test("renders Error title correctly", () => {
        render(
            <BrowserRouter>
              <ErrorPage title={"Test title"} />
            </BrowserRouter>
        );
        expect(screen.getByText("Test title")).toBeInTheDocument();
        expect(screen.getByTestId("error-icon")).toBeInTheDocument();
    });

    test("navigates home on click", () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
        render(
            <BrowserRouter>
              <ErrorPage title={"Test title"} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText("Torna alla Home"));
        expect(mockNavigate).toHaveBeenCalledWith("/"); // sostituisci "/home" con il percorso corretto
    });
});
