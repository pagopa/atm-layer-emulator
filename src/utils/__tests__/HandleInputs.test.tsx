import { fireEvent } from "@testing-library/react";
import { validateInputFields } from "../HandleInputs";

describe("Handle Inputs Tests", () => {

  test("should handle invalid input values", () => {
    document.body.innerHTML = `
      <button id="confirm">Conferma</button>
      <input id="testInput" pattern="\\d+" value="">
    `;

    validateInputFields();
    const confirmButton = document.querySelector("#confirm") as HTMLButtonElement;
    const input = document.querySelector("#testInput") as HTMLInputElement;
    expect(confirmButton.classList.contains("disabled")).toBe(true);
    fireEvent.input(input, { target: { value: "1234567890123456" } });
    expect(confirmButton.classList.contains("disabled")).toBe(false);
    fireEvent.input(input, { target: { value: "string" } });
    expect(confirmButton.classList.contains("disabled")).toBe(true);
  });


  test("validation has no effect if no inputs are present", () => {
    document.body.innerHTML = `
    <button id="confirm">Conferma</button>
  `;
  const confirmButton = document.querySelector("#confirm") as HTMLButtonElement;

  validateInputFields();
  expect(confirmButton.classList.contains("disabled")).toBe(false);
  });


  test("validation has no effect if no confirm button is present", () => {
    document.body.innerHTML = `
    <button id="exit">Esci</button>
    <input id="testInput" pattern="\\d+" value="">
  `;
  const exitButton = document.querySelector("#exit") as HTMLButtonElement;

  validateInputFields();
  expect(exitButton.classList.contains("disabled")).toBe(false);
  });

});




