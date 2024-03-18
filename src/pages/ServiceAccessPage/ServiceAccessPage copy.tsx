/* eslint-disable functional/immutable-data */
import React, { useContext, useEffect } from "react";
import parse from "html-react-parser";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { decodeRenderHtml } from "../../components/DecodeRenderHtml/decodeRenderHtml";
import { TASK_NEXT } from "../../commons/endpoints";
import { fetchRequest } from "../../hook/fetch/fetchRequest";


const ServiceAccessPage = () => {

	const { responseProcess, abortController, setResponseProcess, transactionData, touch } = useContext(Ctx);
	// eslint-disable-next-line functional/no-let
	let bodyHtml :any ;
	if(responseProcess?.task?.template?.content)
	{ bodyHtml= decodeRenderHtml(responseProcess?.task?.template?.content);}

	useEffect(() => {
		addButtonClickListener();
		return () => {
			removeButtonClickListener();
		};
	}, [responseProcess]);

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
		try {
			const response = await fetchRequest({
				urlEndpoint: generatePath(TASK_NEXT, { transactionId: responseProcess?.transactionId }),
				method: "POST",
				abortController,
				body: postData(params),
				headers: { "Content-Type": "application/json" }
			})();

			if (response?.success) {
				setResponseProcess(response?.valuesObj);
			}
		} catch (error) {
			console.log("Response negative: ", error);
		};
	};

	const handleClick = (event: MouseEvent) => {
		const button = event.currentTarget as HTMLButtonElement;
		if (button) {
			const dataString = button.getAttribute("data");
			const data = dataString ? JSON.parse(dataString) : {};
			void next(data);
		}
	};

	const addButtonClickListener = () => {
		const buttons = document?.querySelectorAll("button");
		buttons?.forEach(button => {
			button.addEventListener("click", handleClick);
		});
	};

	const removeButtonClickListener = () => {
		const buttons = document?.querySelectorAll("button");
		buttons?.forEach(button => {
			button.removeEventListener("click", handleClick);
		});
	};

	const liElements = bodyHtml?.querySelectorAll("li");

	liElements?.forEach((li: any) => {
		const button = document?.createElement("button");
		button.innerHTML = li.innerHTML;
		button.id = li.id;
		li.parentNode.replaceChild(button, li);
	});

	const grid = document.createElement("div");

	const menu = bodyHtml?.querySelector("#menu");
	if (menu) {
		grid.classList.add("mui-container-fluid");
		grid.innerHTML = menu.innerHTML;
		grid.id = menu.id;
		menu.parentNode?.replaceChild(grid, menu);
	}

	const headerRow = document.createElement("div");
	if (headerRow) {
		headerRow.classList.add("mui-row");
	}

	const logoColumn = document.createElement("div");
	if (logoColumn) {
		logoColumn.classList.add("mui-col-md-6");
		headerRow.appendChild(logoColumn);
	}

	const logoElement = bodyHtml?.querySelector("#logo");
	if (logoElement) {
		logoColumn.appendChild(logoElement);
	}

	const descColumn = document.createElement("div");
	if (descColumn) {
		descColumn.classList.add("mui-col-md-6");
		headerRow.appendChild(descColumn);
	}

	const descElement = bodyHtml?.querySelector("h1");
	if (descElement) {
		descColumn.appendChild(descElement);
	}

	grid.appendChild(headerRow);

	const titleRow = document.createElement("div");
	if (titleRow) {
		titleRow.classList.add("mui-row", "mui-divider");
	}

	const titleCol = document.createElement("div");
	if (titleCol) {
		titleCol.classList.add("mui-col-md-8");
		titleRow.appendChild(titleCol);
	}

	const titleElement = bodyHtml?.querySelector("h2");
	if (titleElement) {
		titleCol.appendChild(titleElement);
	}

	grid.appendChild(titleRow);

	const subtitleRow = document.createElement("div");
	if (subtitleRow) {
		subtitleRow.classList.add("mui-row");
	}

	const subtitleCol = document.createElement("div");
	if (subtitleCol) {
		subtitleCol.classList.add("mui-col-md-8");
		subtitleRow.appendChild(subtitleCol);
	}

	const subtitleElement = bodyHtml.querySelector("h3");
	if (subtitleElement) {
		subtitleCol.appendChild(subtitleElement);
	}

	grid.appendChild(subtitleRow);

	const rowButtons = document.createElement("div");
	if (rowButtons) {
		rowButtons.classList.add("mui-row");
	}

	grid.appendChild(rowButtons);

	const buttonsArray = responseProcess?.task?.buttons.filter((e: any) => e.id !== "exit");
	buttonsArray?.forEach((responseButton: any) => {
		const buttonColumn = document.createElement("div");
		rowButtons.appendChild(buttonColumn);

		if (buttonColumn) {
			buttonColumn.classList.add("mui-col-md-5");
			buttonColumn.setAttribute("style", "padding: 0px");
		}
		const renderedButton = bodyHtml.querySelector(`#${responseButton.id}`);
		if (renderedButton) {
			renderedButton.setAttribute("style", "width: 100%");
        
			const data = responseButton.data;
			if (data) {
				renderedButton.setAttribute("data", JSON.stringify(data));
			}

			buttonColumn.appendChild(renderedButton);
		}
	});

	const rowButtonExit = document.createElement("div");
	if (rowButtonExit) {
		rowButtonExit.classList.add("mui-row");
	}

	grid.appendChild(rowButtonExit);

	const buttonExit = bodyHtml.querySelector("#exit") as HTMLButtonElement;
	if (buttonExit) {
		buttonExit.classList.add("mui-btn", "mui-btn--raised", "mui-btn--danger");
		rowButtonExit.appendChild(buttonExit);
	}

	bodyHtml.appendChild(grid);

	return (
		<div id={touch ? "touch" : "no-touch"}>
			{parse(bodyHtml.innerHTML)}
		</div>
	);
};

export default ServiceAccessPage;
