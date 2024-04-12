import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import PanInfoCard from "../PanInfoCard";
import { ListItemText, MenuItem } from "@mui/material";
import { PanDto, PanInfoDto } from "../../model/ParametersModel";
import userEvent from '@testing-library/user-event';

describe("PanInfoCard Test", () => {
  const card = {
    pan: "1234567891234567",
    bankName: "ISYBANK",
    circuits: ["Visa"]
  };

  const panInfoErrors = [{ pan: null, bankName: null, circuits: null }];

  const availableCircuits = [
    { id: 0, value: "BANCOMAT", label: "Bancomat", icon: "https://d2xduy7tbgu2d3.cloudfront.net/files/ICON/BANCOMAT.svg" },
    { id: 1, value: "MASTERCARD", label: "Mastercard" },
    { id: 2, value: "VISA", label: "Visa", icon: "https://d2xduy7tbgu2d3.cloudfront.net/files/ICON/VISA.svg" },
  ];

  const multiSelectMenuItems = jest.fn().mockImplementation(() => (
    availableCircuits.map((circuit) => (
      <MenuItem key={circuit.id} value={circuit.value} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <ListItemText primary={circuit.label} data-testid={circuit.label} />
      </MenuItem>
    ))
  ));

  const setOpenFirstCard = jest.fn();
  const setOpenSecondCard = jest.fn();
  const handleChangePanInfoCards = jest.fn();
  const handleChangeMultiSelectCard = jest.fn();
  const formDataPanInfoCardsMocked = {
    panInfo: [card]
  };
  const optionalPaymentMethodPanManagment = jest.fn();

  const renderApp = (openFirstCard: boolean, openSecondCard: boolean, formDataPanInfoCards?: PanInfoDto, cardMocked?: PanDto) => render(
    <PanInfoCard
      card={cardMocked ?? card}
      index={0}
      panInfoErrors={panInfoErrors}
      multiSelectMenuItems={multiSelectMenuItems}
      openFirstCard={openFirstCard}
      openSecondCard={openSecondCard}
      setOpenFirstCard={setOpenFirstCard}
      setOpenSecondCard={setOpenSecondCard}
      handleChangePanInfoCards={handleChangePanInfoCards}
      handleChangeMultiSelectCard={handleChangeMultiSelectCard}
      formDataPanInfoCards={formDataPanInfoCards ?? formDataPanInfoCardsMocked}
      optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
    />
  );

  test("renders PAN input field", () => {
    const { getByPlaceholderText } = renderApp(false, false);
    const panInput = getByPlaceholderText("1234567891234567") as HTMLInputElement;
    expect(panInput).toBeInTheDocument();
    expect(panInput.value).toBe("1234567891234567");
  });

  test("calls handleChangePanInfoCards when PAN input changes", () => {
    const { getByPlaceholderText } = renderApp(false, false);
    const panInput = getByPlaceholderText("1234567891234567") as HTMLInputElement;
    fireEvent.change(panInput, { target: { value: "UpdatedPAN" } });
    expect(handleChangePanInfoCards).toHaveBeenCalledWith(expect.any(Object), 0);
  });

  test("renders Banca PAN input field", () => {
    const { getByPlaceholderText } = renderApp(false, false);
    const bankNameInput = getByPlaceholderText("ISYBANK") as HTMLInputElement;
    expect(bankNameInput).toBeInTheDocument();
    expect(bankNameInput.value).toBe("ISYBANK");
  });

  test("calls optionalPaymentMethodPanManagment when button is clicked", () => {
    const { getByText } = renderApp(false, false);
    const button = getByText("Aggiungi metodo di pagamento pan");
    fireEvent.click(button);
    expect(optionalPaymentMethodPanManagment).toHaveBeenCalledTimes(1);
  });

  test("renders Circuits select field", async () => {
    renderApp(false, false);
    expect(screen.getByLabelText("Circuiti")).toHaveTextContent("Visa");
  });

  test("opens and closes first card correctly", () => {
    const { getByLabelText } = renderApp(false, false);
    const circuitsSelect = getByLabelText("Circuiti") as HTMLSelectElement;
    fireEvent.mouseDown(circuitsSelect);
    expect(setOpenFirstCard).toHaveBeenCalledWith(true);
    fireEvent.mouseOut(circuitsSelect);
    expect(setOpenFirstCard).toHaveBeenCalledWith(true);
  });

  test("renders correct button text based on formDataPanInfoCards length", () => {
    const formDataPanInfoCardsEmpty = {
      panInfo: []
    };
    const { getByText } = renderApp(false, false, formDataPanInfoCardsEmpty)
    expect(getByText("Rimuovi metodo di pagamento pan")).toBeInTheDocument();
    renderApp(false, false)
    expect(getByText("Aggiungi metodo di pagamento pan")).toBeInTheDocument();
  });

  test("Test handleChange BankName", () => {
    renderApp(false, false);
    const bankName = screen.getAllByTestId("bankName-test") as HTMLInputElement[];
    fireEvent.change(bankName[0], { target: { value: "Banca" } })
  });
});