import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LoadingPage } from "../LoadingPage";


describe("Loading Page Tests", () => {


    test("renders loading correctly", () => {
        render(
            <BrowserRouter>
              <LoadingPage />
            </BrowserRouter>
        );
        expect(screen.getByText("Stiamo verificando i dati dell’avviso")).toBeInTheDocument();
        expect(screen.getByTestId("circular-loader")).toBeInTheDocument();
      });

});