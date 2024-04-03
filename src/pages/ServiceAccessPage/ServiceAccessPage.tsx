/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import { Box } from "@mui/material";
import { generatePath } from "react-router-dom";
import React from "react";
import { Ctx } from "../../DataContext";
import { decodeRenderHtml } from "../../components/DecodeRenderHtml/decodeRenderHtml";
import { TASK_NEXT } from "../../commons/endpoints";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import "./css/style-page.css";
import { executeCommand } from "../../commons/utilsFunctions";
import { Loading } from "../../components/Commons/Loading";
import { AUTHORIZE, SCAN_BILL_DATA } from "../../commons/constants";
import { addHeaderRow, createNextLiButton, createPrevLiButton, getPaginationFragment, positionPaginatedButtons, positionUnpaginatedButtons } from "../../utils/Commons";




const ServiceAccessPage = () => {

	const { responseProcess, abortController, setResponseProcess, transactionData, touchInterface } = useContext(Ctx);
	const [loading, setLoading] = useState(false);
	const [command, setCommand] = useState(responseProcess?.task?.command);
	const [menuList, setMenuList] = useState<any | NodeList>();
	const [pageIndex, setPageIndex] = useState(1);
	const pageSize = 4;
	let bodyHtml: any;
	let timeout = responseProcess?.task?.timeout;

	if (responseProcess?.task?.template?.content) {
		bodyHtml = decodeRenderHtml(responseProcess?.task?.template?.content);
	}

	function getPaginationElements(menu:HTMLElement){
		const listItems=document.querySelectorAll("#menu > li");
		if(listItems?.length>pageSize){
			setMenuList(listItems); 
			const frag = getPaginationFragment(Array.from(listItems),menu,pageIndex,pageSize);
			bodyHtml?.appendChild(document?.getElementById("menu")?.appendChild(frag));
			if(!touchInterface){
				positionPaginatedButtons();
			}	
		} else {
			positionUnpaginatedButtons(touchInterface);
		}
	};

	useEffect(() => {
		if (!timeout || timeout === null) {
			timeout = 30;
		}
		const nextTimeout = setTimeout(next, timeout*1000, responseProcess?.task?.onTimeout);
		setPageIndex(1);
		addButtonClickListener();

		const menu=document?.getElementById("menu");
		if(menu){
			getPaginationElements(menu);
		}

		return () => {
			removeButtonClickListener();
			clearTimeout(nextTimeout);
		};
	}, [responseProcess]);

	useEffect(() => {
		if (command && command !== "") {
			executeCommand(command, setCommand, next, responseProcess);
		}
	}, [command]);

	const date = new Date().toISOString().slice(0, -5);
	const postData = (params: any) => ({
		data: {
			"panInfo": [
				{
					"pan": "1234567891234567",
					"circuits": [
						"VISA"
					],
					"bankName": "ISYBANK"
				}, {
					"pan": "8234567891234565",
					"circuits": [
						"BANCOMAT",
						"VISA"
					],
					"bankName": "INTESA"
				}
			],
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

	const next = async (params: any, panInfo?: any) => {
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
			if (dataString) {
				const data = dataString ? JSON.parse(dataString) : {};
				const params: any = { ...data };
				const inputElements = document?.querySelectorAll("input");
				inputElements.forEach((input: any) => {
					params[input.id] = input.value;
				});
				void next(params);
			} else {
				void next({ selected: button.id, continue: true });
			}

		}
	};

	const handleNextLiButtonClick = (event: MouseEvent) => {
		const button = event.currentTarget as HTMLButtonElement;
		if (button) {
			setPageIndex(pageIndex + 1);
		}
	};

	const handlePrevLiButtonClick = (event: MouseEvent) => {
		const button = event.currentTarget as HTMLButtonElement;
		if (button) {
			setPageIndex(pageIndex - 1);
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
		const nextLiButtonElement = document?.getElementById("nextLiButton");
		nextLiButtonElement?.addEventListener("click", handleNextLiButtonClick);

		const prevLiButtonElement = document?.getElementById("prevLiButton");
		prevLiButtonElement?.addEventListener("click", handlePrevLiButtonClick);
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

	bodyHtml = addHeaderRow(bodyHtml);

	// pagino solo se la lista è maggiore del pageSize
	const listLength = bodyHtml?.querySelectorAll("#menu > li")?.length;
	const paginateFlag = listLength>pageSize;
	console.log("page",paginateFlag);
	if(responseProcess?.task?.template?.type === "MENU" && paginateFlag){
		bodyHtml?.appendChild(createNextLiButton());
		bodyHtml?.appendChild(createPrevLiButton());
	}

	if (touchInterface){
		const footerRow = document.createElement("div");
		footerRow.classList.add("mui-row");
		footerRow.id = "footerSection";
		bodyHtml?.appendChild(footerRow);
	}


	if (!touchInterface && bodyHtml?.querySelector("#back")) {
		const exitButton = bodyHtml?.querySelector("#exit");
		exitButton.remove();
	}

	const buttonsArray = responseProcess?.task?.buttons;
	buttonsArray?.forEach((responseElement: any) => {
		const renderedButton = bodyHtml?.querySelector(`#${responseElement.id}`);
		if (renderedButton) {
			const data = responseElement.data;
			if (data) {
				renderedButton.setAttribute("data", JSON.stringify(data));
			}

		}
	});


	return (
		<React.Fragment>
			<Box id={touchInterface ? "touch" : "no-touch"} m={2}>
				{loading ?
					<Loading marginTop={"20%"} message="Operazione in corso, si prega di attendere" />
					:
					bodyHtml && parse(bodyHtml?.innerHTML)
				}

			</Box>
			{command === AUTHORIZE || command === SCAN_BILL_DATA ? 
				(<Box id="command" m={2}/>) : null
			}
		</React.Fragment>
	);
};

export default ServiceAccessPage;
