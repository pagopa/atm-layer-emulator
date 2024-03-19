/* eslint-disable functional/immutable-data */
import React, { useContext, useEffect } from "react";
import parse from "html-react-parser";
import { generatePath } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Ctx } from "../DataContext";
import { decodeRenderHtml } from "../components/DecodeRenderHtml/decodeRenderHtml";
import { TASK_NEXT } from "../commons/endpoints";
import { fetchRequest } from "../hook/fetch/fetchRequest";
// import "./ServiceAccessStyle.css";



const TestPage = () => {

	const { responseProcess, abortController, setResponseProcess, transactionData, touch } = useContext(Ctx);
	// eslint-disable-next-line functional/no-let
	let bodyHtml :any ;
	// eslint-disable-next-line functional/no-let
	let timeout = responseProcess?.task?.timeout;
	if(responseProcess?.task?.template?.content){ 
		bodyHtml= decodeRenderHtml(responseProcess?.task?.template?.content);
	}


	useEffect(() => {
		if (!timeout || timeout === null){
			timeout = 30;
		}
		const nextTimeout = setTimeout(next, timeout*1000, responseProcess?.task?.onTimeout);
		addButtonClickListener();
		return () => {
			removeButtonClickListener();
			clearTimeout(nextTimeout);
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

	
	return (
		<div id={touch ? "touch" : "no-touch"}>
			{parse(bodyHtml.innerHTML)}
		</div>
	);
};

export default TestPage;
