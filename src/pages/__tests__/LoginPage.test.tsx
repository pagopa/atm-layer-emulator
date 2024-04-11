import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Ctx } from "../../DataContext";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../LoginPage";
import routes from "../../routes";

describe("Login Page Tests", () => {


    test("renders unlogged without jwt and tries access", () => {
        const clearAll = jest.fn();
        const debugOn = false;
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

      test("renders with jwt and cleans storage", async () => {
        window.location.hash = "#access_token=12345&jwt_console=Bearer&expires_in=5184000&state=";
        const setLogged = jest.fn();
        const clearAll = jest.fn();
        const debugOn = true;
        const logged = false;
        render(
          <Ctx.Provider value={{ clearAll, debugOn, logged, setLogged }}>
            <BrowserRouter>
              <LoginPage />
            </BrowserRouter>
          </Ctx.Provider>
        );
        expect(sessionStorage.getItem("jwt_emulator")).toBe("Bearer");
        expect(setLogged).toHaveBeenCalledWith(true);
        await waitFor(() => expect(window.location.pathname).toBe(routes.HOME));

      });

});