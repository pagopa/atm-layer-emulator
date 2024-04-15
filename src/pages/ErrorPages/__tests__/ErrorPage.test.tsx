import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage";


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

});