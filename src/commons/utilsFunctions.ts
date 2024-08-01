import { IbanListDto } from "../components/model/ParametersModel";
import { PanInfoDto } from "./../components/model/ParametersModel";
/* eslint-disable functional/immutable-data */
import { AUTHORIZE, END, GET_IBAN, GET_PAN, PRINT_RECEIPT, NEXT, SCAN_BILL_DATA, DEFAULT_SCAN_CODE, ESITO_OK, ESITO_KO, ESITO_DUBBIO, GET_CF } from "./constants";

export function executeCommand(driver: string, setCommand: any, next: any, responseProcess: any, ibanList?:IbanListDto, panInfo?:PanInfoDto, fiscalCode?:any) {

	const outcomeVar = responseProcess?.task?.outcomeVarName;
	const outcomeKey = outcomeVar || "result";
	
	switch (driver) {
	case SCAN_BILL_DATA:

		const nextScanBillData: any = (inputElement: HTMLInputElement) => {
			next({ [outcomeKey]: "OK", "scanData": inputElement.value });
			setCommand("");
		};

		const command = document.getElementById("command");
		if (command) {

			const tableRow = document.createElement("div");
			tableRow.classList.add("mui-row");

			const titleColumn = document.createElement("div");
			titleColumn.classList.add("mui-col-md-12", "center");
			const title = document.createElement("h4");
			title.innerHTML = "Inserisci codice scansionato:";
			titleColumn.appendChild(title);

			const textColumn = document.createElement("div");
			textColumn.classList.add("mui-col-md-12", "center");

			const inputElement = document.createElement("input");
			inputElement.defaultValue = DEFAULT_SCAN_CODE;
			inputElement.setAttribute("id", "textarea");
			inputElement.setAttribute("type", "text");
			textColumn.appendChild(inputElement);

			const buttonColumn = document.createElement("div");
			buttonColumn.classList.add("mui-col-md-12", "center");

			const confirmButton = document.createElement("button");
			confirmButton.id = "command-submit-btn";
			confirmButton.innerHTML = "Conferma";
			confirmButton.addEventListener("click", () => nextScanBillData(inputElement));
			buttonColumn.appendChild(confirmButton);

			tableRow.appendChild(titleColumn);
			tableRow.appendChild(textColumn);
			tableRow.appendChild(buttonColumn);
			command.appendChild(tableRow);
		}

		break;
	case AUTHORIZE:
		const totalAmount = responseProcess?.task?.data?.totalAmount;

		const renderAuthorizeForm = () => {
			const authorizeBox = document.getElementById("command");
	
			if(authorizeBox){	
				const authorizeButton = document.createElement("button");
				const doubtfulButton = document.createElement("button");
				const cancelButton = document.createElement("button");
				const text = document.createElement("h4");
	
				authorizeButton.setAttribute("id", "authorize-button");
				doubtfulButton.setAttribute("id", "doubtful-button");
				cancelButton.setAttribute("id", "cancel-button");
				text.setAttribute("id", "text-authorize");
				authorizeButton.className = "command-button";
				doubtfulButton.className = "command-button";
				cancelButton.className = "command-button";
	
				text.textContent = `Seleziona l'esito da simulare per il pagamento di ${responseProcess?.task?.data?.totalAmount/100}`;
		
				authorizeButton.textContent = "Autorizzare";
				doubtfulButton.textContent = "Esito Dubbio";
				cancelButton.textContent = "Autorizzazione negata";
		
				authorizeButton.addEventListener("click", () => {next({ [outcomeKey] : ESITO_OK, "continue" : true }); setCommand("");});
				doubtfulButton.addEventListener("click", () => {next({ [outcomeKey] : ESITO_DUBBIO, "continue" : true }); setCommand("");});
				cancelButton.addEventListener("click", () => {next({ [outcomeKey] : ESITO_KO}); setCommand("");});
	
				const buttonsDiv = document.createElement("div");
				buttonsDiv.setAttribute("id", "command-buttons-div");
	
				buttonsDiv.appendChild(cancelButton);
				buttonsDiv.appendChild(doubtfulButton);
				buttonsDiv.appendChild(authorizeButton);
	
				authorizeBox.appendChild(text);
				authorizeBox.appendChild(buttonsDiv);
			} else {
				console.error("Impossibile trovare l'elemento con l'ID specificato.");
			}
		};
		renderAuthorizeForm();
		break;
	case PRINT_RECEIPT:
		const receipt = responseProcess.task.receiptTemplate;
		if (receipt) {
			setTimeout(function () {
				const newDocumentReceipt = (new DOMParser).parseFromString(atob(receipt), "text/html");
				const wnd = window.open();
				if (wnd) {
					const el = wnd.document.createElement("div");
					// eslint-disable-next-line functional/immutable-data
					el.innerHTML = newDocumentReceipt.body.innerHTML;
					wnd.document.body.appendChild(el);

					const style = wnd.document.createElement("style");
					// eslint-disable-next-line functional/immutable-data
					style.innerText = "body {border: 2px black solid;display: flex;flex-direction: column;width: 600px;margin-left:auto;margin-right:auto;font-family: Courier New, monospace; font-size: 23px;} p {display: flex;flex-wrap: wrap;margin-bottom: 0px; margin-left: 25px;margin-right: 25px;} .left {text-align: left; } .right {text-align: right; } .center {text-align: center; } .bold {font-weight: bold;} span{flex: 1; white-space: pre-line;-ms-word-wrap: break-word;}span:hover{border: 1px black dotted; } span.col-1 {flex: 0 0 8.33%; } span.col-2 {flex: 0 0 16.67%; } span.col-3 {flex: 0 0 25%; } span.col-4 {flex: 0 0 33.33%; } span.col-5 {flex: 0 0 41.67%; } span.col-6 {flex: 0 0 50%; } span.col-7 {flex: 0 0 58.33%; } span.col-8 {flex: 0 0 66.67%;} span.col-9 {flex: 0 0 75%;} span.col-10 {flex: 0 0 83.33%;} span.col-11 {flex: 0 0 91.67%;} span.col-12 {flex: 0 0 100%;}";
					wnd.document.head.appendChild(style);

					void next({ [outcomeKey]: "OK" });
				} else {
					console.error("Impossibile aprire la finestra pop-up");
				}
			}, 3000);
		}
		break;
	case END:
		void next({ "result": "OK" });
		history.back();
		break;
	case NEXT:
		void next({ [outcomeKey]: "OK" });
		break;
	case GET_IBAN:
		if(ibanList && ibanList.IBANlist.length > 0) {
			void next({ [outcomeKey]: "OK", ...ibanList});
		} else {
			void next({ [outcomeKey]: "KO" });
		}
		break;
	case GET_PAN:
		if(panInfo && panInfo.panInfo.length > 0) {
			void next({ [outcomeKey]: "OK"}, panInfo);
		} else {
			void next({ [outcomeKey]: "KO" });
		}
		break;
	case GET_CF:
		// eslint-disable-next-line object-shorthand
		void next({ [outcomeKey]: "OK", "fiscalCode": fiscalCode });
		break;
	default: return "";
	};
};
