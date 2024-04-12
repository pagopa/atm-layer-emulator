/* eslint-disable functional/immutable-data */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import FormEmulatorParameters from "../FormEmulatorParameters";

const originalFetch = global.fetch;

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => { });
	jest.spyOn(console, "warn").mockImplementation(() => { });
});

afterEach(() => {
	global.fetch = originalFetch;
});

describe("Test FormEmulatorParameters component", () => {

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

	test("Test add and remove new pan payment method", () => {
		renderApp();
		const addPanBtn = screen.getByText("Aggiungi metodo di pagamento pan") as HTMLButtonElement;
		fireEvent.click(addPanBtn);
		const removePanBtn = screen.getByText("Rimuovi metodo di pagamento pan") as HTMLButtonElement;
		fireEvent.click(removePanBtn);
	});

	test("Test add and remove new iban payment method", () => {
		renderApp();
		const addIbanBtn = screen.getByText("Aggiungi metodo di pagamento Iban") as HTMLButtonElement;
		fireEvent.click(addIbanBtn);
		const removeIbanBtn = screen.getByText("Rimuovi metodo di pagamento Iban") as HTMLButtonElement;
		fireEvent.click(removeIbanBtn);
	});

	test("Test submit of form emulator", () => {
		global.fetch = jest.fn().mockResolvedValueOnce({
			json: () => Promise.resolve({
				status: 200,
				success: true,
				valuesObj: {
					data: {
						continue: true
					},
					device: {
						bankId: "06789",
						branchId: "12345",
						channel: "ATM",
						code: "0001",
						opTimestamp: "2024-04-11T09:05:27",
						peripherals: [
							{
								id: "PRINTER",
								name: "Receipt printer",
								status: "OK"
							},
							{
								id: "SCANNER",
								name: "Scanner",
								status: "OK"
							}
						],
						terminalId: "64874412"
					},
					fiscalCode: "SNNCNA88S04A567U"
				},
			}),
		});
		renderApp();
		const submitBtn = screen.getByText("Conferma");
		fireEvent.click(submitBtn);
	});

	test("Test submit of form emulator with error", () => {
		global.fetch = jest.fn().mockRejectedValueOnce(new Error("Fetch error"));
		renderApp();
		const submitBtn = screen.getByText("Conferma");
		fireEvent.click(submitBtn);
	});
});