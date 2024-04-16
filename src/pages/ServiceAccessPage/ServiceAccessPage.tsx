/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import { Box, Grid, Typography } from "@mui/material";
import { generatePath } from "react-router-dom";
import React from "react";
import { Ctx } from "../../DataContext";
import { decodeRenderHtml } from "../../components/DecodeRenderHtml/decodeRenderHtml";
import { TASK_NEXT } from "../../commons/endpoints";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import "./css/style-page.css";
import { executeCommand } from "../../commons/utilsFunctions";
import { Loading } from "../../utils/Commons/Loading";
import { AUTHORIZE, COMMAND_INFO_TEMPLATE, SCAN_BILL_DATA } from "../../commons/constants";
import { addHeaderRow, createNextLiButton, createPrevLiButton, getPaginationFragment, positionPaginatedButtons, positionUnpaginatedButtons } from "../../utils/Commons";
import { addButtonClickListener, removeButtonClickListener } from "../../utils/HandleClicks";
import { postData } from "../../utils/PostData";
import { validateInputFields } from "../../utils/HandleInputs";
import KeyPad from "../../components/KeyPadComponents/KeyPad";


const ServiceAccessPage = () => {

	const { responseProcess, abortController, setResponseProcess, transactionData, touchInterface, panInfo, ibanList } = useContext(Ctx);
	const [loading, setLoading] = useState(false);
	const [command, setCommand] = useState(responseProcess?.task?.command);
	const [menuList, setMenuList] = useState<any | NodeList>();
	const [pageIndex, setPageIndex] = useState(1);
	const pageSize = 4;
	let bodyHtml: any;
	let timeout = responseProcess?.task?.timeout;

	if (responseProcess?.task?.template?.content) {
		bodyHtml = decodeRenderHtml(responseProcess?.task?.template?.content);
	} else if (!responseProcess?.task?.template?.content && (responseProcess?.task?.command === AUTHORIZE || responseProcess?.task?.command === SCAN_BILL_DATA)) {
		bodyHtml = decodeRenderHtml(COMMAND_INFO_TEMPLATE);
	}

	function getPaginationElements() {
		const listItems = document.querySelectorAll("#menu > li");
		if (listItems?.length > pageSize) {
			setMenuList(listItems);
			const frag = getPaginationFragment(Array.from(listItems), pageIndex, pageSize);
			bodyHtml?.appendChild(document?.getElementById("menu")?.appendChild(frag));
			if (!touchInterface) {
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
		const nextTimeout = setTimeout(next, timeout * 1000, responseProcess?.task?.onTimeout);
		setPageIndex(1);
		setMenuList({});
		addButtonClickListener(next, handleNextLiButtonClick, handlePrevLiButtonClick);
		validateInputFields();

		const menu = document?.getElementById("menu");
		if (menu) {
			getPaginationElements();
		}

		return () => {
			removeButtonClickListener(next);
			clearTimeout(nextTimeout);
		};
	}, [responseProcess]);

	useEffect(() => {
		if (command && command !== "") {
			executeCommand(command, setCommand, next, responseProcess, ibanList, panInfo);
		}
	}, [command]);

	useEffect(() => {
		const menu = document?.getElementById("menu");
		if (menu && menuList) {
			const frag = getPaginationFragment(Array.from(menuList), pageIndex, pageSize);
			bodyHtml?.appendChild(document?.getElementById("menu")?.appendChild(frag));
			if (!touchInterface) {
				positionPaginatedButtons();
			}
		}
	}, [pageIndex]);

	const next = async (params: any) => {
		setLoading(true);
		try {
			const response = await fetchRequest({
				urlEndpoint: generatePath(TASK_NEXT, { transactionId: responseProcess?.transactionId }),
				method: "POST",
				abortController,
				body: postData(params, responseProcess, transactionData),
				headers: { "Content-Type": "application/json" }
			})();

			if (response?.success) {
				setCommand(response?.valuesObj?.task?.command);
				setResponseProcess(response?.valuesObj);
			}
		} catch (error) {
			console.log("Response negative: ", error);
		} finally {
			setLoading(false);
		}
	};

	const handleNextLiButtonClick = (event: MouseEvent) => {
		const button = event.currentTarget as HTMLButtonElement;
		if (button) {
			setPageIndex(pageIndex => pageIndex + 1);
		}
	};

	const handlePrevLiButtonClick = (event: MouseEvent) => {
		const button = event.currentTarget as HTMLButtonElement;
		if (button) {
			setPageIndex(pageIndex => pageIndex - 1);
		}
	};


	bodyHtml = addHeaderRow(bodyHtml);

	// pagino solo se la lista è maggiore del pageSize
	const listLength = bodyHtml?.querySelectorAll("#menu > li")?.length;
	const paginateFlag = listLength > pageSize;
	if (responseProcess?.task?.template?.type === "MENU" && paginateFlag) {
		bodyHtml?.appendChild(createNextLiButton());
		bodyHtml?.appendChild(createPrevLiButton());
	}

	if (touchInterface) {
		const footerRow = document.createElement("div");
		footerRow.classList.add("mui-row");
		footerRow.id = "footerSection";
		bodyHtml?.appendChild(footerRow);
	}


	const exitButton = bodyHtml?.querySelector("#exit");
	if (!touchInterface && !exitButton?.hasAttribute("data-fdk")) {
		exitButton?.remove();
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
		<React.Fragment >
			<Box id={touchInterface ? "touch" : "no-touch"} m={2}>
				{loading ?
					<Loading marginTop={"20%"} message="Operazione in corso, si prega di attendere" />
					:
					bodyHtml && parse(bodyHtml?.innerHTML)
				}

			</Box>
			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" maxHeight="600px">
				{command === AUTHORIZE || command === SCAN_BILL_DATA ? (<Box id="command" m={2} />) : null}

				{responseProcess?.task?.template?.type === "FORM" &&
					(
						<Box display={"flex"} flexDirection="row" justifyContent={"center"} alignItems={"center"}>
							<KeyPad next={next} />
						</Box>
					)
				}
			</Box>

		</React.Fragment>
	);
};

export default ServiceAccessPage;
