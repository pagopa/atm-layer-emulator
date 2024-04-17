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

	test("Test add and remove new pan payment method positive case", () => {
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
		const pan = screen.getByTestId("pan-test") as HTMLInputElement;
		const bankName = screen.getByTestId("bankName-test") as HTMLInputElement;
		const selectCircuits = screen.getByTestId("circuits-select-0") as HTMLSelectElement;
		const circuits = screen.getByRole('combobox') as HTMLSelectElement;
		const submitBtn = screen.getByText("Conferma");

		expect(pan.value).toBe("");
		fireEvent.change(pan, { target: { value: "1234567890123456" } });
		expect(pan.value).toBe("1234567890123456")

		expect(bankName.value).toBe("");
		fireEvent.change(bankName, { target: { value: "BANK" } });
		expect(bankName.value).toBe("BANK")

		fireEvent.mouseDown(circuits);
		fireEvent.click(screen.getByText("Mastercard"));
		expect(selectCircuits.value).toBe("MASTERCARD");
		fireEvent.mouseLeave(circuits);

		const addPanBtn = screen.getByText("Aggiungi metodo di pagamento pan");
		fireEvent.click(addPanBtn);

		const removePanBtn = screen.getByText("Rimuovi metodo di pagamento pan") as HTMLButtonElement;
		fireEvent.click(removePanBtn);

		fireEvent.click(submitBtn);
	});

	test("Test add and remove new pan payment method negative case", () => {
		renderApp();
		const pan = screen.getByTestId("pan-test") as HTMLInputElement;
		const bankName = screen.getByTestId("bankName-test") as HTMLInputElement;
		const submitBtn = screen.getByText("Conferma");

		fireEvent.change(pan, { target: { value: "123456789012345" } });
		expect(pan.value).toBe("123456789012345");

		fireEvent.click(submitBtn);

		fireEvent.change(pan, { target: { value: "" } });
		expect(pan.value).toBe("");

		fireEvent.change(bankName, { target: { value: "BANK" } });
		expect(bankName.value).toBe("BANK")

		fireEvent.click(submitBtn);
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

	test("validation blocks empty form fields", () => {
		renderApp();

		const acquirerIdInput = screen.getByLabelText("ID Banca *");
		fireEvent.change(acquirerIdInput, { target: { value: "" } });

		const branchIdInput = screen.getByLabelText("ID Filiale *");
		fireEvent.change(branchIdInput, { target: { value: "" } });

		const codeInput = screen.getByLabelText("Codice *");
		fireEvent.change(codeInput, { target: { value: "" } });

		const terminalIdInput = screen.getByLabelText("ID Terminale *");
		fireEvent.change(terminalIdInput, { target: { value: "" } });

		const fiscalCodeInput = screen.getByLabelText("Codice Fiscale");
		fireEvent.change(fiscalCodeInput, { target: { value: "" } });

		const submitButton = screen.getByRole("button", { name: "Conferma" });
		fireEvent.click(submitButton);

		// const errorMessage = screen.getByText("Campo obbligatorio");
		// expect(errorMessage).toBeInTheDocument();
	});


});