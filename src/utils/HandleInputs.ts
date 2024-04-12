import { ChangeEvent } from "react";
import checks from "./checks";

const { isValidInputValue } = checks();

const handleChange = (event: InputEvent, confirmButton: HTMLElement) => {
	const input = event.target as HTMLInputElement;

	if (input.pattern && isValidInputValue(input.value, input.pattern)){
		confirmButton?.classList.remove("disabled");
	} else {
		confirmButton?.classList.add("disabled");
	}
};




export const validateInputFields = () => {
	const inputElements = document?.querySelectorAll("input");
	if (inputElements.length>0){
		const confirmButton = document?.getElementById("confirm");
		confirmButton?.classList.add("disabled");
		const handleChangeFunction = (event: InputEvent) => {
			if(confirmButton){
				handleChange(event, confirmButton);
			}
		};
		inputElements.forEach((input: any) => {
			input.addEventListener("input", handleChangeFunction);
		});
	}

};