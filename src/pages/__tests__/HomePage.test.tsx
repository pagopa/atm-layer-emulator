import { fireEvent, render, screen } from "@testing-library/react";
import { Ctx } from "../../DataContext";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";

describe("Home Page Tests", () => {


    test("renders homepage", () => {
        const abortController = new AbortController();
        const setResponseProcess = jest.fn();
        const setTransactionData = jest.fn();
        const touchInterface = true;
        const debugOne = false;
        const setPanInfo = jest.fn();
        const setIbanList = jest.fn();
        render(
          <Ctx.Provider value={{abortController, setResponseProcess, setTransactionData, touchInterface, debugOne, setPanInfo, setIbanList}}>
            <BrowserRouter>
              <HomePage />
            </BrowserRouter>
          </Ctx.Provider>
        );
        expect(screen.getByText("Simulatore ATM")).toBeInTheDocument();
      });

});