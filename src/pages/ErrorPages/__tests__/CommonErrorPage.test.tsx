import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CommonErrorPage } from "../CommonErrorPage";


describe("Common Error Page Tests", () => {


    test("renders Error elements correctly", () => {
        const childElement = <h2>Subtitle test</h2>;
        const icon = <img src="" data-testid="error-icon" />
        render(
            <BrowserRouter>
              <CommonErrorPage title={"Test title"} icon={icon} children={childElement} />
            </BrowserRouter>
        );
        expect(screen.getByText("Test title")).toBeInTheDocument();
        expect(screen.getByText("Subtitle test")).toBeInTheDocument();
        expect(screen.getByTestId("error-icon")).toBeInTheDocument();
      });

});