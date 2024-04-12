import { render, fireEvent } from "@testing-library/react";
import IbanInfoCard from "../IbanInfo";
import { Ctx } from "../../../DataContext";

describe("IbanInfo Test", () => {

  const abortController = new AbortController();

  const iban = {
    IBAN: "IT60X0542811101000000123456",
    bankName: "ISYBANK"
  };

  const ibanListErrors = [{ IBAN: null, bankName: null }];

  const formDataIbanList = {
    IBANlist: [iban]
  };

  const handleChangeIbanList = jest.fn();
  const optionalPaymentMethodIbanManagment = jest.fn();

  test("renders IBAN input field", () => {
    const { getByPlaceholderText } = render(
      <Ctx.Provider value={{ abortController }}>
        <IbanInfoCard
          iban={iban}
          index={0}
          ibanListErrors={ibanListErrors}
          handleChangeIbanList={handleChangeIbanList}
          formDataIbanList={formDataIbanList}
          optionalPaymentMethodIbanManagment={optionalPaymentMethodIbanManagment}
        />
      </Ctx.Provider>
    );

    const ibanInput = getByPlaceholderText("IBAN") as HTMLInputElement;
    expect(ibanInput).toBeInTheDocument();
    expect(ibanInput.value).toBe("IT60X0542811101000000123456");
  });

  test("calls handleChangeIbanList when IBAN input changes", () => {
    const { getByPlaceholderText } = render(
      <IbanInfoCard
        iban={iban}
        index={0}
        ibanListErrors={ibanListErrors}
        handleChangeIbanList={handleChangeIbanList}
        formDataIbanList={formDataIbanList}
        optionalPaymentMethodIbanManagment={optionalPaymentMethodIbanManagment}
      />
    );

    const ibanInput = getByPlaceholderText("IBAN") as HTMLInputElement;
    fireEvent.change(ibanInput, { target: { value: "UpdatedIBAN" } });
    expect(handleChangeIbanList).toHaveBeenCalledWith(expect.any(Object), 0);
  });

  test("renders Banca IBAN input field", () => {
    const { getByPlaceholderText } = render(
      <IbanInfoCard
        iban={iban}
        index={0}
        ibanListErrors={ibanListErrors}
        handleChangeIbanList={handleChangeIbanList}
        formDataIbanList={formDataIbanList}
        optionalPaymentMethodIbanManagment={optionalPaymentMethodIbanManagment}
      />
    );

    const bankNameInput = getByPlaceholderText("es: ISYBANK") as HTMLInputElement;
    expect(bankNameInput).toBeInTheDocument();
    expect(bankNameInput.value).toBe("ISYBANK");
  });

  test("calls optionalPaymentMethodIbanManagment when button is clicked", () => {
    const { getByText } = render(
      <IbanInfoCard
        iban={iban}
        index={0}
        ibanListErrors={ibanListErrors}
        handleChangeIbanList={handleChangeIbanList}
        formDataIbanList={formDataIbanList}
        optionalPaymentMethodIbanManagment={optionalPaymentMethodIbanManagment}
      />
    );

    const button = getByText("Aggiungi metodo di pagamento Iban");
    fireEvent.click(button);
    expect(optionalPaymentMethodIbanManagment).toHaveBeenCalledTimes(1);
  });

});