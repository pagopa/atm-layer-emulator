import checks from "./checks";

const { isValidInputValue } = checks();

export 	const handleClickFunction = (event: MouseEvent, next:any) => {
	const button = event.currentTarget as HTMLButtonElement;
	if (button) {
		const dataString = button.getAttribute("data");
		if (dataString) {
			const data = dataString ? JSON.parse(dataString) : {};
			const params: any = { ...data };
			const inputElements = document?.querySelectorAll("input");
			inputElements.forEach((input: any) => {
				// eslint-disable-next-line functional/immutable-data
				params[input.id] = input.value;
			});
			void next(params);
		} else {
			void next({ selected: button.id, continue: true });
		}
	}
};

export 	const addButtonClickListener = (next:any, handleNextLiButtonClick:any, handlePrevLiButtonClick:any) => {

	const handleClick = (event: MouseEvent) => {
		handleClickFunction(event, next);
	};
    
	// const buttons = document?.querySelectorAll("button");
	const buttons = document?.querySelectorAll("button[id]:not(#btn-keypad,#canc-keypad, #enter-keypad, #clear-keypad)") as NodeListOf<HTMLButtonElement>;
	buttons?.forEach((button: any) => {
		button.addEventListener("click", handleClick);
	});
	// const listButtons = document?.querySelectorAll("li");
	const listButtons = document?.querySelectorAll("li[id]") as NodeListOf<HTMLButtonElement>;
	listButtons?.forEach(listButton => {
		listButton.addEventListener("click", handleClick);
	});
	const nextLiButtonElement = document?.getElementById("nextLiButton");
	nextLiButtonElement?.removeEventListener("click", handleClick);
	
	nextLiButtonElement?.addEventListener("click", handleNextLiButtonClick);

	const prevLiButtonElement = document?.getElementById("prevLiButton");
	prevLiButtonElement?.removeEventListener("click", handleClick);
	prevLiButtonElement?.addEventListener("click", handlePrevLiButtonClick);
};

export 	const removeButtonClickListener = (next:any) => {
	const handleClick = (event: MouseEvent) => {
		handleClickFunction(next, event);
	};

	const buttons = document?.querySelectorAll("button");
	buttons?.forEach(button => {
		button.removeEventListener("click", handleClick);
	});
	const listButtons = document?.querySelectorAll("li");
	listButtons?.forEach(listButton => {
		listButton.removeEventListener("click", handleClick);
	});
};