import { handleClickFunction, addButtonClickListener, removeButtonClickListener } from "../HandleClicks";
import checks from "../checks";

const { isValidInputValue } = checks();

describe("handleClickFunction", () => {
    test("should handle click events correctly", () => {
      const mockEvent = {
        currentTarget: {
          getAttribute: jest.fn().mockReturnValue(JSON.stringify({})),
        },
      } as unknown as MouseEvent;
      const mockNext = jest.fn();
      handleClickFunction(mockEvent, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  

 
    test("should add click listeners to buttons", () => {
      document.body.innerHTML = `
        <button id="button1"></button>
        <button id="button2"></button>
        <li id="li1"></li>
        <li id="li2"></li>
      `;
      const mockNext = jest.fn();
      const mockHandleNextLiButtonClick = jest.fn();
      const mockHandlePrevLiButtonClick = jest.fn();
      addButtonClickListener(mockNext, mockHandleNextLiButtonClick, mockHandlePrevLiButtonClick);
      const button1 = document.querySelector("#button1") as HTMLElement;
      const button2 = document.querySelector("#button2") as HTMLElement;
      const li1 = document.querySelector("#li1") as HTMLElement;
      const li2 = document.querySelector("#li2") as HTMLElement;
      button1.click();
      button2.click();
      li1.click();
      li2.click();
      expect(mockNext).toHaveBeenCalledTimes(4);
    });



  test("should remove click listeners from buttons", () => {
    document.body.innerHTML = `
      <button id="button1"></button>
      <button id="button2"></button>
      <li id="li1"></li>
      <li id="li2"></li>
    `;
    const mockNext = jest.fn();
    removeButtonClickListener(mockNext);
    const button1 = document.querySelector("#button1") as HTMLElement;
    const button2 = document.querySelector("#button2") as HTMLElement;
    const li1 = document.querySelector("#li1") as HTMLElement;
    const li2 = document.querySelector("#li2") as HTMLElement;
    button1.click();
    button2.click();
    li1.click();
    li2.click();
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should handle invalid input values", () => {
    document.body.innerHTML = `
      <button id="testButton" data="{}"></button>
      <input id="testInput" pattern="\\d+" value="invalid">
    `;
    const mockEvent = {
      currentTarget: document.querySelector("#testButton"),
    } as unknown as MouseEvent;
    const mockNext = jest.fn();
    handleClickFunction(mockEvent, mockNext);
    const input = document.querySelector("#testInput") as HTMLInputElement;
    expect(input.classList.contains("warning")).toBe(true);
    expect(input.value).toBe("");
    expect(input.getAttribute("placeholder")).toBe("Campo non valido");
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("should handle valid input values", () => {
    document.body.innerHTML = `
      <button id="testButton" data="{}"></button>
      <input id="testInput" pattern="\\d+" value="123">
    `;
    const mockEvent = {
      currentTarget: document.querySelector("#testButton"),
    } as unknown as MouseEvent;
    const mockNext = jest.fn();
    handleClickFunction(mockEvent, mockNext);
    const input = document.querySelector("#testInput") as HTMLInputElement;
    expect(input.classList.contains("warning")).toBe(false);
    expect(mockNext).toHaveBeenCalled();
  });

  test("should handle button clicks without data", () => {
    document.body.innerHTML = `
      <button id="testButton"></button>
    `;
    const mockEvent = {
      currentTarget: document.querySelector("#testButton"),
    } as unknown as MouseEvent;
    const mockNext = jest.fn();
    handleClickFunction(mockEvent, mockNext);
    expect(mockNext).toHaveBeenCalledWith({ selected: "testButton", continue: true });
  });
});

