/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { decodeRenderHtml } from "../../components/DecodeRenderHtml/decodeRenderHtml";
import { TASK_NEXT } from "../../commons/endpoints";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import "./css/CommonStyle.css";
import "./css/touch-style.css";
// import { createMuiRow, wrapElementInMuiCol, wrapElementInMuiColAndRow, wrapElementInMuiRow } from "../../utils/Commons";
import { executeCommand } from "../../commons/utilsFunctions";



// eslint-disable-next-line complexity
const ServiceAccessPage = () => {

	const { responseProcess, abortController, setResponseProcess, transactionData, touchInterface } = useContext(Ctx);
	const [loading, setLoading] = useState(false);
	const [command, setCommand] = useState("");
	let bodyHtml :any ;
	let timeout = responseProcess?.task?.timeout;
	const templateType = responseProcess?.task?.template?.type;
	if(responseProcess?.task?.template?.content)
	{ bodyHtml= decodeRenderHtml(responseProcess?.task?.template?.content);}
	const svgArrowIcon = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071C16.0976 18.3166 16.0976 17.6834 15.7071 17.2929L10.4142 12L15.7071 6.70711C16.0976 6.31658 16.0976 5.68342 15.7071 5.29289Z" fill="#0066CC" />
        </svg>
    `;

	const svgExitIcon = `
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 17.2555C12.7469 17.6697 12.4087 18.003 11.9945 18L3.72255 17.9394C1.66225 17.9243 0 16.2499 0 14.1895V3.75C0 1.67893 1.67893 0 3.75 0H12C12.4142 0 12.75 0.335786 12.75 0.75C12.75 1.16421 12.4142 1.5 12 1.5H3.75C2.50736 1.5 1.5 2.50736 1.5 3.75V14.1895C1.5 15.4257 2.49735 16.4304 3.73353 16.4395L12.0055 16.5C12.4197 16.5031 12.753 16.8413 12.75 17.2555ZM12.2197 3.9693C12.5126 3.67641 12.9874 3.67641 13.2803 3.9693L17.7803 8.4693C18.0732 8.7622 18.0732 9.23707 17.7803 9.52996L13.2803 14.03C12.9874 14.3229 12.5126 14.3229 12.2197 14.03C11.9268 13.7371 11.9268 13.2622 12.2197 12.9693L15.4393 9.74963H6.75C6.33579 9.74963 6 9.41385 6 8.99963C6 8.58542 6.33579 8.24963 6.75 8.24963H15.4393L12.2197 5.02996C11.9268 4.73707 11.9268 4.2622 12.2197 3.9693Z" fill="#D75252"/>
		</svg>	
	`;
	const parser = new DOMParser();


	useEffect(() => {
		if (!timeout || timeout === null){
			timeout = 30;
		}
		// const nextTimeout = setTimeout(next, timeout*1000, responseProcess?.task?.onTimeout);
		addButtonClickListener();
		
		// const command = responseProcess?.task.command;
		// if (command !== undefined && command !== null) {
		// 	executeCommand(command);
		// }
		
		return () => {
			removeButtonClickListener();
			// clearTimeout(nextTimeout);
		};
	}, [responseProcess]);

	useEffect(() => {
		if(command && command!==""){
			executeCommand(command, next, responseProcess);
		}
	}, [command]);

	const date = new Date().toISOString().slice(0, -5);
	const postData = (params: any) => ({
		data: {
			...params
		},
		device: {
			bankId: transactionData.acquirerId,
			branchId: transactionData.branchId,
			channel: "ATM",
			code: transactionData.code,
			opTimestamp: date,
			peripherals: [
				{
					id: "PRINTER",
					name: "Receipt printer",
					status: transactionData.printer
				},
				{
					id: "SCANNER",
					name: "Scanner",
					status: transactionData.scanner
				}
			],
			terminalId: transactionData.terminalId,
		},
		taskId: responseProcess?.task?.id,
	});

	const next = async (params: any) => {
		setLoading(true);
		try {
			const response = await fetchRequest({
				urlEndpoint: generatePath(TASK_NEXT, { transactionId: responseProcess?.transactionId }),
				method: "POST",
				abortController,
				body: postData(params),
				headers: { "Content-Type": "application/json" }
			})();

			if (response?.success) {
				
				if (response?.valuesObj?.task?.command) {
					setCommand(response?.valuesObj?.task?.command);
				}
				setResponseProcess(response?.valuesObj);
			}
		} catch (error) {
			console.log("Response negative: ", error);
		} finally {
			setLoading(false);
		}
	};

	const handleClick = (event: MouseEvent) => {
		const button = event.currentTarget as HTMLButtonElement;
		if (button) {
			const dataString = button.getAttribute("data");
			if(dataString){
				const data = dataString ? JSON.parse(dataString) : {};
				const params: any = { ...data };
				const inputElements = document?.querySelectorAll("input");
				inputElements.forEach((input: any) => {
					params[input.id] = input.value;
				});
				void next(params);
			} else {
				void next({selected: button.id, continue: true});
			}
			
		}
	};

	const addButtonClickListener = () => {
		const buttons = document?.querySelectorAll("button");
		buttons?.forEach(button => {
			button.addEventListener("click", handleClick);
		});
		const listButtons = document?.querySelectorAll("li");
		listButtons?.forEach(listButton => {
			listButton.addEventListener("click", handleClick);
		});
	};

	const removeButtonClickListener = () => {
		const buttons = document?.querySelectorAll("button");
		buttons?.forEach(button => {
			button.removeEventListener("click", handleClick);
		});
		const listButtons = document?.querySelectorAll("li");
		listButtons?.forEach(listButton => {
			listButton.removeEventListener("click", handleClick);
		});
	};

	// const grid = document.createElement("div");
	// grid.classList.add("decoded-html");



	// if (templateType ==="MENU") {
	// 	const liElements = bodyHtml?.querySelectorAll("li");
	// 	liElements?.forEach((li: any) => {
	// 		const button = document?.createElement("button");
	// 		button.innerHTML = li?.innerHTML;
	// 		button.id = li.id;
	// 		li.parentNode.replaceChild(button, li);
	// 	});

	// 	const menu = bodyHtml?.querySelector("#menu");
	// 	if (menu) {
	// 		grid.classList.add("mui-container-fluid");
	// 		grid.innerHTML = menu?.innerHTML;
	// 		grid.id = menu.id;
	// 		menu.parentNode?.replaceChild(grid, menu);
	// 	}
	// }

	// const headerRow = createMuiRow();
	// const logoElement = bodyHtml?.querySelector("#logo");
	// if (logoElement) {
	// 	const logoColumn = wrapElementInMuiCol("md-6", logoElement);
	// 	headerRow.appendChild(logoColumn);
	// }
	// const descElement = bodyHtml?.querySelector("h1");
	// if (descElement) {
	// 	descElement.classList.add("decoded-desc");
	// 	const descColumn = wrapElementInMuiCol("md-6", descElement);
	// 	descColumn.setAttribute("style", "display: flex; justify-content: flex-end ");
	// 	headerRow.appendChild(descColumn);
	// }
	// grid?.appendChild(headerRow);


	// const titleElement = bodyHtml?.querySelector("h2");
	// if (titleElement) {
	// 	titleElement.classList.add("decoded-title", templateType === "MENU"? "left-aligned-text":"centered-text");
	// 	const titleRow = wrapElementInMuiColAndRow("md-8", titleElement, templateType === "MENU"? "left-aligned-element":"centered-element");
	// 	grid?.appendChild(titleRow);
	// }
	
	// const subtitleElement = bodyHtml?.querySelector("h3");
	// if (subtitleElement) {
	// 	subtitleElement.classList.add("decoded-subtitle", templateType === "MENU"? "left-aligned-text":"centered-text");
	// 	const subtitleRow = wrapElementInMuiColAndRow("md-8", subtitleElement, templateType === "MENU"? "left-aligned-element":"centered-element");
	// 	grid?.appendChild(subtitleRow);
	// }


	// switch (templateType){
	// case "SUMMARY":
	// 	const tableElement = bodyHtml?.querySelector("table");
	// 	const tableRow = wrapElementInMuiRow(tableElement);
	// 	tableRow.classList.add("centered-element");
	// 	grid.appendChild(tableRow);
	// 	const paragraphElement = bodyHtml?.querySelector("p");
	// 	if (paragraphElement){const paragraphRow = wrapElementInMuiColAndRow("md-6", paragraphElement, undefined, "left");
	// 		grid.appendChild(paragraphRow);}
	// 	break;
	// case "FORM":
	// 	const inputElement = bodyHtml?.querySelector("input");
	// 	const labelElement = bodyHtml?.querySelector("label");
	// 	const inputRow = wrapElementInMuiColAndRow("md-10",labelElement,"centered-element", "centered-element");
	// 	grid.appendChild(inputRow);
	// 	break;
	// case "FULL_SCREEN":
	// 	const imgElement = bodyHtml?.querySelector("img");
	// 	const imgRow = wrapElementInMuiRow(imgElement, "centered-element");
	// 	grid.appendChild(imgRow);
	// }


	// const rowButtons = document.createElement("div");
	// rowButtons.classList.add("mui-row", templateType === "MENU"? "centered-element-vertical":"centered-element");

	// grid?.appendChild(rowButtons);

	const buttonsArray = responseProcess?.task?.buttons;
	buttonsArray?.forEach((responseElement: any) => {
		const renderedButton = bodyHtml?.querySelector(`#${responseElement.id}`);
		if (renderedButton) {
			const data = responseElement.data;
			if (data) {
				renderedButton.setAttribute("data", JSON.stringify(data));
			}
			// renderedButton.classList.add("decoded-normal-button");
			// const buttonColumn = wrapElementInMuiCol("md-12",renderedButton);
			// buttonColumn.classList.add(templateType === "MENU"? "left-aligned-element":"centered-element");
			// rowButtons.appendChild(buttonColumn);
			// const svgElement = parser.parseFromString(svgArrowIcon, "image/svg+xml").documentElement;
			// renderedButton.insertBefore(svgElement, renderedButton.firstChild);
		}
	});

	// if (touchInterface){
	// 	const buttonExit = bodyHtml?.querySelector("#exit") as HTMLButtonElement;
	// 	if (buttonExit) {
	// 		const svgElement = parser.parseFromString(svgExitIcon, "image/svg+xml").documentElement;
	// 		svgElement.setAttribute("style", "margin-right: 16px");
	// 		buttonExit.insertBefore(svgElement, buttonExit.firstChild);
	// 		const rowButtonExit = wrapElementInMuiRow(buttonExit);
	// 		rowButtonExit.classList.add(templateType === "MENU"? "centered-element-vertical":"centered-element");
	// 		grid?.appendChild(rowButtonExit);
	// 	}
	// } else {
	// 	const buttonExit = bodyHtml?.querySelector("#exit") as HTMLButtonElement;
	// 	buttonExit?.remove();
	// }

	// bodyHtml?.appendChild(grid);

	return (
		<div id={touchInterface ? "touch" : "no-touch"}>
			{/* {loading ? (
				<CircularProgress />
			) : (
				parse(bodyHtml?.innerHTML)
			)} */}
			{ bodyHtml ? parse(bodyHtml?.innerHTML) : null}
		</div>
	);
};

export default ServiceAccessPage;
