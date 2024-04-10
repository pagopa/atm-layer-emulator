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
import { addButtonClickListener, removeButtonClickListener } from "../../utils/HandleClicks";
import { postData } from "../../utils/PostData";


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
	} else {
		bodyHtml = decodeRenderHtml("PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSIgPz4KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPgo8aHRtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI+Cgo8Ym9keT4KIAkKCTxpbWcgaWQ9ImxvZ28iIHNyYz0iaHR0cHM6Ly9kMnhkdXk3dGJndTJkMy5jbG91ZGZyb250Lm5ldC9maWxlcy9JQ09OL2RlZmF1bHRfbG9nby5zdmciLz4KCTxoMT5TZXJ2aXppIGRpIHB1YmJsaWNhIHV0aWxpdCZhZ3JhdmU7PC9oMT4JCgkKCTxpbWcgaWQ9ImNvbmNlcHQiIGNsYXNzPSJjZW50cmFsIiBzcmM9Imh0dHBzOi8vZDJ4ZHV5N3RiZ3UyZDMuY2xvdWRmcm9udC5uZXQvZmlsZXMvSUNPTi9pbmZvLnN2ZyIgLz4KCQoJPGgyPkVzZWd1aXJlIGlsIGNvbWFuZG8gcGVyIHByb2NlZGVyZTwvaDI+CgkKCTwvYm9keT4KCQo8L2h0bWw+");
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
		setMenuList({});
		addButtonClickListener(next, handleNextLiButtonClick, handlePrevLiButtonClick);

		const menu=document?.getElementById("menu");
		if(menu){
			getPaginationElements(menu);
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
		const menu=document?.getElementById("menu");
		if(menu && menuList){
			const frag = getPaginationFragment(Array.from(menuList),menu,pageIndex,pageSize);
			bodyHtml?.appendChild(document?.getElementById("menu")?.appendChild(frag));
			if(!touchInterface){
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
				body: postData(params,responseProcess,transactionData),
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


	const exitButton= bodyHtml?.querySelector("#exit");
	if (!touchInterface && !exitButton?.hasAttribute("data-fdk")){
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
