import { fireEvent, render, screen } from "@testing-library/react";
import { Ctx } from "../../DataContext";
import { BrowserRouter } from "react-router-dom";
import LoginPageCallback from "../LoginPageCallback";

describe("Login Page Callback Tests", () => {


    test("renders without jwt", () => {
        const setLogged = jest.fn();
        global.open = jest.fn();
        render(
          <Ctx.Provider value={{setLogged}}>
            <BrowserRouter>
              <LoginPageCallback />
            </BrowserRouter>
          </Ctx.Provider>
        );
        expect(window.location.pathname).toBe("/login");
      });

      test("renders with jwt", () => {
        const setLogged = jest.fn();
        window.location.hash = "#access_token=12345&token_type=Bearer&expires_in=5184000&state=";
        render(
          <Ctx.Provider value={{ setLogged }}>
            <BrowserRouter>
              <LoginPageCallback />
            </BrowserRouter>
          </Ctx.Provider>
        );
        expect(window.location.pathname).toBe("/");
      });

});