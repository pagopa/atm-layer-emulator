import { render, fireEvent, getByText, screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import PanInfoCard from "../PanInfoCard";
import { Avatar, ListItemAvatar, ListItemText, MenuItem } from "@mui/material";

describe("PanInfoCard Test", () => {
  const card = {
    pan: "1234567891234567",
    bankName: "ISYBANK",
    circuits: ["Visa"]
  };

  const card2 = {
    pan: "1234567891234561",
    bankName: "BANK",
    circuits: ["MASTERCARD"]
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
  const formDataPanInfoCards = {
    panInfo: [card]
  };
  const optionalPaymentMethodPanManagment = jest.fn();

  test("renders PAN input field", () => {
    const { getByPlaceholderText } = render(
      <PanInfoCard
        card={card}
        index={0}
        panInfoErrors={panInfoErrors}
        multiSelectMenuItems={multiSelectMenuItems}
        openFirstCard={false}
        openSecondCard={false}
        setOpenFirstCard={setOpenFirstCard}
        setOpenSecondCard={setOpenSecondCard}
        handleChangePanInfoCards={handleChangePanInfoCards}
        handleChangeMultiSelectCard={handleChangeMultiSelectCard}
        formDataPanInfoCards={formDataPanInfoCards}
        optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
      />
    );

    const panInput = getByPlaceholderText("1234567891234567") as HTMLInputElement;
    expect(panInput).toBeInTheDocument();
    expect(panInput.value).toBe("1234567891234567");
  });

  test("calls handleChangePanInfoCards when PAN input changes", () => {
    const { getByPlaceholderText } = render(
      <PanInfoCard
        card={card}
        index={0}
        panInfoErrors={panInfoErrors}
        multiSelectMenuItems={multiSelectMenuItems}
        openFirstCard={false}
        openSecondCard={false}
        setOpenFirstCard={setOpenFirstCard}
        setOpenSecondCard={setOpenSecondCard}
        handleChangePanInfoCards={handleChangePanInfoCards}
        handleChangeMultiSelectCard={handleChangeMultiSelectCard}
        formDataPanInfoCards={formDataPanInfoCards}
        optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
      />
    );

    const panInput = getByPlaceholderText("1234567891234567") as HTMLInputElement;
    fireEvent.change(panInput, { target: { value: "UpdatedPAN" } });
    expect(handleChangePanInfoCards).toHaveBeenCalledWith(expect.any(Object), 0);
  });

  test("renders Banca PAN input field", () => {
    const { getByPlaceholderText } = render(
      <PanInfoCard
        card={card}
        index={0}
        panInfoErrors={panInfoErrors}
        multiSelectMenuItems={multiSelectMenuItems}
        openFirstCard={false}
        openSecondCard={false}
        setOpenFirstCard={setOpenFirstCard}
        setOpenSecondCard={setOpenSecondCard}
        handleChangePanInfoCards={handleChangePanInfoCards}
        handleChangeMultiSelectCard={handleChangeMultiSelectCard}
        formDataPanInfoCards={formDataPanInfoCards}
        optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
      />
    );

    const bankNameInput = getByPlaceholderText("ISYBANK") as HTMLInputElement;
    expect(bankNameInput).toBeInTheDocument();
    expect(bankNameInput.value).toBe("ISYBANK");
  });

  test("calls optionalPaymentMethodPanManagment when button is clicked", () => {
    const { getByText } = render(
      <PanInfoCard
        card={card}
        index={0}
        panInfoErrors={panInfoErrors}
        multiSelectMenuItems={multiSelectMenuItems}
        openFirstCard={false}
        openSecondCard={false}
        setOpenFirstCard={setOpenFirstCard}
        setOpenSecondCard={setOpenSecondCard}
        handleChangePanInfoCards={handleChangePanInfoCards}
        handleChangeMultiSelectCard={handleChangeMultiSelectCard}
        formDataPanInfoCards={formDataPanInfoCards}
        optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
      />
    );

    const button = getByText("Aggiungi metodo di pagamento pan");
    fireEvent.click(button);
    expect(optionalPaymentMethodPanManagment).toHaveBeenCalledTimes(1);
  });

//   test("renders Circuits select field", async () => {
//     render(
//       <PanInfoCard
//         card={card}
//         index={0}
//         panInfoErrors={panInfoErrors}
//         multiSelectMenuItems={multiSelectMenuItems}
//         openFirstCard={false}
//         openSecondCard={false}
//         setOpenFirstCard={setOpenFirstCard}
//         setOpenSecondCard={setOpenSecondCard}
//         handleChangePanInfoCards={handleChangePanInfoCards}
//         handleChangeMultiSelectCard={handleChangeMultiSelectCard}
//         formDataPanInfoCards={formDataPanInfoCards}
//         optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
//       />
//     );
  
//     const circuitsSelect = screen.getByLabelText("Circuiti");
  
//     // Simula la pressione del mouse sul campo di input
//     fireEvent.click(circuitsSelect);
  
//     // Attendi che il menu a discesa si apra
//     await waitFor(() => screen.getByTestId("circuits-select-0"));
  
//     // Seleziona l'opzione "Visa" dal menu a discesa
//     const visaOption = screen.getByTestId("circuits-select-Visa");
  
//     fireEvent.click(visaOption);
  
//     // Verifica che l'opzione sia stata selezionata correttamente
//     expect(screen.getByLabelText("Circuiti")).toHaveTextContent("Visa");
//   });

  test("renders Circuits select field", async () => {
    render(
      <PanInfoCard
        card={card}
        index={0}
        panInfoErrors={panInfoErrors}
        multiSelectMenuItems={multiSelectMenuItems}
        openFirstCard={false}
        openSecondCard={false}
        setOpenFirstCard={setOpenFirstCard}
        setOpenSecondCard={setOpenSecondCard}
        handleChangePanInfoCards={handleChangePanInfoCards}
        handleChangeMultiSelectCard={handleChangeMultiSelectCard}
        formDataPanInfoCards={formDataPanInfoCards}
        optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
      />
    );
  
    expect(screen.getByLabelText("Circuiti")).toHaveTextContent("Visa");
  });



  test("opens and closes first card correctly", () => {
    const { getByLabelText } = render(
      <PanInfoCard
        card={card}
        index={0}
        panInfoErrors={panInfoErrors}
        multiSelectMenuItems={multiSelectMenuItems}
        openFirstCard={false}
        openSecondCard={false}
        setOpenFirstCard={setOpenFirstCard}
        setOpenSecondCard={setOpenSecondCard}
        handleChangePanInfoCards={handleChangePanInfoCards}
        handleChangeMultiSelectCard={handleChangeMultiSelectCard}
        formDataPanInfoCards={formDataPanInfoCards}
        optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
      />
    );
  
    const circuitsSelect = getByLabelText("Circuiti") as HTMLSelectElement;
    fireEvent.mouseDown(circuitsSelect);
    expect(setOpenFirstCard).toHaveBeenCalledWith(true);
  
    fireEvent.mouseOut(circuitsSelect);
    expect(setOpenFirstCard).toHaveBeenCalledWith(true);

  });
  
  
  
//   test("calls handleChangeMultiSelectCard when Circuits select changes", () => {
//     const { getByLabelText } = render(
//       <PanInfoCard
//         card={card}
//         index={0}
//         panInfoErrors={panInfoErrors}
//         multiSelectMenuItems={multiSelectMenuItems}
//         openFirstCard={false}
//         openSecondCard={false}
//         setOpenFirstCard={setOpenFirstCard}
//         setOpenSecondCard={setOpenSecondCard}
//         handleChangePanInfoCards={handleChangePanInfoCards}
//         handleChangeMultiSelectCard={handleChangeMultiSelectCard}
//         formDataPanInfoCards={formDataPanInfoCards}
//         optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
//       />
//     );
  
//     const circuitsSelect = getByLabelText("Circuiti") as HTMLSelectElement;
//     fireEvent.change(circuitsSelect, { target: { value: ["Visa", "MasterCard"] } });
//     expect(handleChangeMultiSelectCard).toHaveBeenCalledWith(expect.any(Object), 0);
//   });

  test("renders correct button text based on formDataPanInfoCards length", () => {
    const formDataPanInfoCardsEmpty = {
      panInfo: []
    };
  
    const { getByText, rerender } = render(
      <PanInfoCard
        card={card}
        index={0}
        panInfoErrors={panInfoErrors}
        multiSelectMenuItems={multiSelectMenuItems}
        openFirstCard={false}
        openSecondCard={false}
        setOpenFirstCard={setOpenFirstCard}
        setOpenSecondCard={setOpenSecondCard}
        handleChangePanInfoCards={handleChangePanInfoCards}
        handleChangeMultiSelectCard={handleChangeMultiSelectCard}
        formDataPanInfoCards={formDataPanInfoCardsEmpty}
        optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
      />
    );
  
    expect(getByText("Rimuovi metodo di pagamento pan")).toBeInTheDocument();
  
    const updatedFormDataPanInfoCards = {
      panInfo: [card]
    };
  
    rerender(
      <PanInfoCard
        card={card}
        index={0}
        panInfoErrors={panInfoErrors}
        multiSelectMenuItems={multiSelectMenuItems}
        openFirstCard={false}
        openSecondCard={false}
        setOpenFirstCard={setOpenFirstCard}
        setOpenSecondCard={setOpenSecondCard}
        handleChangePanInfoCards={handleChangePanInfoCards}
        handleChangeMultiSelectCard={handleChangeMultiSelectCard}
        formDataPanInfoCards={updatedFormDataPanInfoCards}
        optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
      />
    );
  
    expect(getByText("Aggiungi metodo di pagamento pan")).toBeInTheDocument();
  });
  
});
