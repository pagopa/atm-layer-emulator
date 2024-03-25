import { AUTHORIZE, END, GET_IBAN, GET_PAN, PRINT_RECEIPT, NEXT, SCAN_BILL_DATA } from "./constants";


/* eslint-disable functional/no-let */
export function click():void{
	console.log("quick click");
}

export function executeCommand(driver: string, next: any, responseProcess:any) {
	
	switch(driver) {
	case SCAN_BILL_DATA:
		const result = prompt("Inserisci codice scansionato:", "UEFHT1BBfDAwMnwwMTIzNDU2Nzg5MDEyMzQ1Njd8MDAwMDAwMDAyMDF8MTAwMDA");
		if (result != null) {
			void next({ "result": "OK", "scanData": result });
		} else {
			void next({ "result": "KO" });
		}
		break;
	case AUTHORIZE: 
		console.log("authorize", responseProcess?.task?.data?.totalAmount);
		if (!confirm("Autorizzare il pagamento di "+(responseProcess?.task?.data?.totalAmount/100)+" ? ")){		
			if(confirm("Esito Dubbio? ")){
				void next({ "authResult" : "KO_DUBBIO" });
			} else {
				void next({ "result" : "KO"});
			}
		} else{
			void next({ "result" : "OK", "continue" : true});
		}
		break;
	case PRINT_RECEIPT:
		const receipt = responseProcess.task.receiptTemplate;
		if (receipt) {
			setTimeout(function() {
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
		
					void next({ "result" : "OK" });
				} else {
					console.error("Impossibile aprire la finestra pop-up");
				}
			}, 3000);
		}
		break;
	case END: 
		void next({ "result" : "OK" });
		history.back();
		break;
	case NEXT: 
		void next({ "result" : "OK" });
		break;
	case GET_IBAN: 
		void next({ "result" : "OK", "IBANlist":[{"IBAN":"IT12A1234512345123456789012","bankName": "INTESA"},{"IBAN":"IT12A1234512345123456789018","bankName": "POSTE"}]});
		break;
	case GET_PAN:
		void next({ "result" : "OK" });    
		break;
	default: return "";
	};
};
