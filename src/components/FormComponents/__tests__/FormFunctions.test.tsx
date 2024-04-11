import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import FormEmulatorParameters from "../FormEmulatorParameters";

beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
    jest.spyOn(console, "warn").mockImplementation(() => { });
});

describe("Test FormFunctions component", () => {
    const abortController = new AbortController();
    const setResponseProcess = jest.fn();
    const setTransactionData = jest.fn();
    const touchInterface = jest.fn();
    const setTouchInterface = jest.fn();
    const setPanInfo = jest.fn();
    const setIbanList = jest.fn();

    const renderApp = () => render(
        <Ctx.Provider value={{
            abortController,
            setResponseProcess,
            setTransactionData,
            touchInterface,
            setTouchInterface,
            setPanInfo,
            setIbanList
        }}>
            <BrowserRouter>
                <FormEmulatorParameters />
            </BrowserRouter>
        </Ctx.Provider>
    );

    test("Test handleChange", () => {
        renderApp();
        const acquirerId = screen.getByTestId("acquirerId-test") as HTMLInputElement;
        fireEvent.change(acquirerId, { target: { value: "1234567890123456" } });

        const printerSwitch = screen.getByTestId("printer-test") as HTMLInputElement;
        fireEvent.click(printerSwitch);

        const touchSwitch = screen.getByTestId("touch-test") as HTMLInputElement;
        fireEvent.click(touchSwitch);
    });

    test("Test handleChangePanInfoCards", () => {
        renderApp();
        const pan = screen.getByTestId("pan-test") as HTMLInputElement;
        fireEvent.change(pan, { target: { value: "1234567890123456" } });
    });

    test("Test handleChangeIbanList", () => {
        renderApp();
        const iban = screen.getByTestId("iban-test") as HTMLInputElement;
        fireEvent.change(iban, { target: { value: "IT12A1234512345123456789013" } });
    });

    test("Test handleChangeMultiSelectCard", () => {
        renderApp();
        const circuits = screen.getByRole('combobox') as HTMLSelectElement;
        fireEvent.mouseDown(circuits);
        fireEvent.click(screen.getByText("Mastercard"));
    });
});