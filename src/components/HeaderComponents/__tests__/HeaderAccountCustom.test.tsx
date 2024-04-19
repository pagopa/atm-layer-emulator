import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HeaderAccountCustom } from "../HeaderAccountCustom";
import { LogoPagoPACompany } from "@pagopa/mui-italia";
import { Ctx } from "../../../DataContext";

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => { });
	jest.spyOn(console, "warn").mockImplementation(() => { });
});

describe("HeaderAccountCustom test", () => {
	test("First render", () => {
		render(
			<Ctx.Provider value={{ userEmail: "prova@test.it" }}>
				<BrowserRouter>
					<HeaderAccountCustom
						rootLink={{
							element: <LogoPagoPACompany color="default" variant="default" />,
							href: undefined,
							ariaLabel: "",
							title: ""
						}} />
				</BrowserRouter>
			</Ctx.Provider>
		);
	});

    test("Calls onLogout function when logout button is clicked", () => {
        // Mockiamo la funzione onLogout
        const onLogoutMock = jest.fn();

        render(
            <Ctx.Provider value={{ userEmail: { email: "prova@test.it" }, setUserEmail: jest.fn(), abortController: jest.fn() }}>
                <BrowserRouter>
                    <HeaderAccountCustom
                        rootLink={{
                            element: <LogoPagoPACompany color="default" variant="default" />,
                            href: undefined,
                            ariaLabel: "",
                            title: ""
                        }}
                        loggedUser={true}
                        onLogout={onLogoutMock}
                    />
                </BrowserRouter>
            </Ctx.Provider>
        );

        // Simula il clic sul pulsante di logout
        fireEvent.click(screen.getByTestId("exit-button-test"));

        // Assicura che la funzione onLogout sia stata chiamata
        expect(onLogoutMock).toHaveBeenCalled();
    });
});