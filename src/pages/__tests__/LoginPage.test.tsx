import { fireEvent, render, screen } from "@testing-library/react";
import { Ctx } from "../../DataContext";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../LoginPage";

describe("Login Page Tests", () => {


    test("renders unlogged without jwt and tries access", () => {
        const clearAll = jest.fn();
        const debugOn = true;
        const logged = false;
        const setLogged = jest.fn();
        global.open = jest.fn();
        render(
          <Ctx.Provider value={{ clearAll, debugOn, logged, setLogged }}>
            <BrowserRouter>
              <LoginPage />
            </BrowserRouter>
          </Ctx.Provider>
        );
        expect(screen.getByText("Accedi alla console")).toBeInTheDocument();
        expect(screen.getByText("Accedi")).toBeInTheDocument();
        const accessButton = screen.getByTestId("accedi-button-test");
        fireEvent.click(accessButton);
        expect(global.open).toBeCalled();
      });

});