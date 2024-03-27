/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import { Box } from "@mui/material";
import { generatePath } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { decodeRenderHtml } from "../../components/DecodeRenderHtml/decodeRenderHtml";
import { TASK_NEXT } from "../../commons/endpoints";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import "./css/style-page.css";
import { executeCommand } from "../../commons/utilsFunctions";
import { Loading } from "../../components/Commons/Loading";




const ServiceAccessPage = () => {

	const { responseProcess, abortController, setResponseProcess, transactionData, touchInterface } = useContext(Ctx);
	const [loading, setLoading] = useState(false);
	const [command, setCommand] = useState(responseProcess?.task?.command);
	const [menuList, setMenuList]=useState<any | NodeList >();
	const [pageIndex, setPageIndex]=useState(1);
	const pageSize=4;
	let bodyHtml :any ;
	let timeout = responseProcess?.task?.timeout;
	
	if(responseProcess?.task?.template?.content){ 
		bodyHtml= decodeRenderHtml(responseProcess?.task?.template?.content);
	}

	useEffect(() => {
		console.log("menuList", menuList);
	}, [menuList]);

	// funzione paginazione array
	function paginate( arr: Array<Element>, pageNumber:number) {
		// human-readable page numbers usually start with 1, so we reduce 1 in the first argument
		const array= menuList? Array.from(menuList) :arr;
		return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
	};

	// function convertToNodeList(arrayOfNodes:Array<any>){
	// 	const fragment = document.createDocumentFragment();
	// 	arrayOfNodes.forEach(function(item){
	// 		fragment.appendChild(item.cloneNode(true));
	// 	});
	// 	return fragment.childNodes;
	// };

	function getPaginationElements(){
		// const list=menuList?.querySelectorAll("li");
		const listItems=document.querySelectorAll("#menu > li");
		if(listItems?.length>pageSize){
			// mi metto da parte la lista non paginata di li
			setMenuList(listItems); 
			const paginationArray=paginate(Array.from(listItems), 1);
			// aggiungo bottoni 
			// bodyHtml?.querySelector("#menu")?.innerHTML = paginationArray;
			// eslint-disable-next-line no-param-reassign
			listItems.forEach(el => el.remove());
			console.log(listItems, listItems?.length, paginationArray);
			// menuList.appendchild(paginationArray as unknown as  NodeList);
			// menuList.=paginationArray;
		}
	};

	useEffect(() => {
		if (!timeout || timeout === null){
			timeout = 30;
		}
		// const nextTimeout = setTimeout(next, timeout*1000, responseProcess?.task?.onTimeout);
		addButtonClickListener();

		if(document?.getElementById("menu")){
			getPaginationElements();
		}
		// const command = responseProcess?.task.command;
		// if (command !== undefined && command !== null) {
		// 	executeCommand(command, next, responseProcess);
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
			"panInfo": [
				{
					"pan": "1234567891234567",
					"circuits": [
						"VISA"
					],
					"bankName": "ISYBANK"
				},{
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

	const next = async (params: any, panInfo?:any) => {
		// setCommand("");
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

	
	
	const headerRow = document.createElement("div");
	headerRow.classList.add("mui-row");
	headerRow.id = "headerSection";
	const logoElement = bodyHtml?.querySelector("#logo");
	if (logoElement) {
		const logoColumn = document.createElement("div");
		logoColumn.classList.add("mui-col-md-6");
		logoColumn.appendChild(logoElement);
		headerRow.appendChild(logoColumn);
	}
	const descElement = bodyHtml?.querySelector("h1");
	if (descElement) {
		const descColumn = document.createElement("div");
		descColumn.classList.add("mui-col-md-6");
		descColumn.appendChild(descElement);
		descColumn.setAttribute("style", "display: flex; justify-content: flex-end ");
		headerRow.appendChild(descColumn);
	}
	
	bodyHtml?.insertBefore(headerRow, bodyHtml.firstChild);

	if (!touchInterface && bodyHtml?.querySelector("#back")){
		const exitButton= bodyHtml?.querySelector("#exit");
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
		<Box id={touchInterface ? "touch" : "no-touch"} m={2}>
			{loading ? 
				<Loading  marginTop={"20%"} message="Operazione in corso, si prega di attendere" />
			 : 
				bodyHtml && parse(bodyHtml?.innerHTML)
			}
			
		</Box>
	);
};

export default ServiceAccessPage;
