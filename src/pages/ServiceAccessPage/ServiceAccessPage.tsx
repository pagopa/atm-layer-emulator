/* eslint-disable functional/immutable-data */
import React, { useContext } from "react";
import parse from "html-react-parser";
import { Ctx } from "../../DataContext";
// import "./ServiceAccessStyle.css";
import { decodeRenderHtml } from "../../components/DecodeRenderHtml/decodeRenderHtml";

const getRender=()=> {
	const { responseProcess } = useContext(Ctx);
	console.log("template",responseProcess?.task?.template?.content);
	const bodyHtml = decodeRenderHtml(responseProcess?.task?.template?.content);
	console.log("parsed body", bodyHtml);
	console.log(bodyHtml);

	const liElements = bodyHtml.querySelectorAll("li");

	// Sostituisci gli elementi <li> con bottoni <button>
	liElements.forEach((li: any) => {
		const button = document.createElement("button");
		button.innerHTML = li.innerHTML;
		button.id = li.id;
		li.parentNode.replaceChild(button, li);
	});


	// Crea un componente griglia e assegna lo stile ad un elemento <div>

	const grid = document.createElement("div");
	const menu = bodyHtml.querySelector("#menu");

	if (menu) {

		// aggiungi alla griglia lo stile del container
		grid.classList.add("mui-container-fluid");

		// sostituisci l'elemento griglia appena creato con l'elemento HTML con il tag id="menu"
		grid.innerHTML = menu.innerHTML;
	
		// sostituisci l'id dell'elemento griglia appena creato con l'id del vecchio elemento a cui era assegnato l'id "menu"
		grid.id = menu.id;

		// rimpiazza sul nodo definitivamente l'elemento menu con l'elemento grid
		menu.parentNode?.replaceChild(grid, menu);
	}

	// creazione di un elemento div (una nuova row per la griglia)
	const rowButtons = document.createElement("div");
	if (rowButtons) {
	// aggiunta dello stile mui-row all'elemento appena creato
		rowButtons.classList.add("mui-row");
	}

	// "Appendere" all'elemento padre grid l'elemento figlio row
	grid.appendChild(rowButtons);


	const responseButtons = [];
	responseButtons.push(responseProcess?.task?.buttons);
	// eslint-disable-next-line array-callback-return
	responseButtons.map( (responseButton, i) => {
		const buttonColumn = document.createElement("div");
		if(buttonColumn) {
			// Aggiunta dello stile alla colonna che rendiamo md-5
			buttonColumn.classList.add("mui-col-md-5");
			buttonColumn.setAttribute("style", "padding: 0px");
			// "Appendere" all'elemento padre rowButtons l'elemento della colonna
			rowButtons.appendChild(buttonColumn);
		}
		// Prendersi l'elemento con id "pagamentoAviso"
		const renderedButton = bodyHtml.querySelector(responseButton.id);
		if (renderedButton) {
			renderedButton.setAttribute("style", "width: 100%");
			// "Appendere" all'elemento padre buttonPaymentColumn l'elemento figlio con id "pagamentoAviso"
			buttonColumn.appendChild(renderedButton);
		}
	});



	// // creazione di un elemento div (una nuova colonna per la row della griglia)
	// const buttonPaymentColumn = document.createElement("div");
	// if(buttonPaymentColumn) {
	// // Aggiunta dello stile alla colonna che rendiamo md-5
	// 	buttonPaymentColumn.classList.add("mui-col-md-5");
	// 	buttonPaymentColumn.setAttribute("style", "padding: 0px");
	// 	// "Appendere" all'elemento padre rowButtons l'elemento della colonna
	// 	rowButtons.appendChild(buttonPaymentColumn);
	// }
	// // Prendersi l'elemento con id "pagamentoAviso"
	// const buttonPayment = bodyHtml.querySelector("#pagamentoAviso");
	// if (buttonPayment) {
	// 	buttonPayment.setAttribute("style", "width: 100%");
	// 	// "Appendere" all'elemento padre buttonPaymentColumn l'elemento figlio con id "pagamentoAviso"
	// 	buttonPaymentColumn.appendChild(buttonPayment);
	// }


	// // creazione di un elemento div (una nuova colonna per la row della griglia)
	// const buttonInitiativeIDPayColumn = document.createElement("div");
	// if(buttonInitiativeIDPayColumn) {
	// // Aggiunta dello stile alla colonna che rendiamo md-5
	// 	buttonInitiativeIDPayColumn.classList.add("mui-col-md-5");
	// 	buttonInitiativeIDPayColumn.setAttribute("style", "padding: 0px; margin-left: 16px");
	// 	// "Appendere" all'elemento padre rowButtons l'elemento della colonna
	// 	rowButtons.appendChild(buttonInitiativeIDPayColumn);
	// }
	// const buttonInitiativeIDPay = bodyHtml.querySelector("#iniziativeIDPay");
	// if(buttonInitiativeIDPay) {
	// 	buttonInitiativeIDPay.setAttribute("style", "width: 100%");
	// 	buttonInitiativeIDPayColumn.appendChild(buttonInitiativeIDPay);
	// }






	const rowButtonExit = document.createElement("div");
	if (rowButtonExit) {
	// aggiunta dello stile mui-row all'elemento appena creato
		rowButtonExit.classList.add("mui-row");
	}

	grid.appendChild(rowButtonExit);

	const buttonExit = bodyHtml.querySelector("#exit");
	if (buttonExit) {
		buttonExit.classList.add("mui-btn", "mui-btn--raised", "mui-btn--danger");
		rowButtonExit.appendChild(buttonExit);
	}

	// Aggiungere al body della pagina HTML il componente appena creato e modificato
	bodyHtml.appendChild(grid);





	// // // Creare una tabella per organizzare i bottoni
	// const table = document.createElement("table");
	// const row1 = table.insertRow();
	// const row2 = table.insertRow();

	// // Aggiungi il bottone #pagamentoAviso nella prima riga della tabella
	// const cell1 = row1.insertCell();
	// cell1.appendChild(bodyHtml.querySelector("#pagamentoAviso") ?? <div /> as unknown as HTMLElement);

	// // Aggiungi il bottone #iniziativeIDPay nella prima riga della tabella
	// const cell2 = row1.insertCell();
	// cell2.appendChild(bodyHtml.querySelector("#iniziativeIDPay") ?? <div /> as unknown as HTMLElement);

	// // Aggiungi il bottone #exit nella seconda riga della tabella
	// const cell3 = row2.insertCell();

	// const buttonExit = bodyHtml.querySelector("#exit");
	// if (buttonExit) {
	// 	buttonExit.classList.add("mui-btn", "mui-btn--raised", "mui-btn--danger");
	// 	cell3.appendChild(buttonExit);
	// }

	// // Aggiungi la tabella al corpo HTML
	return parse(bodyHtml.innerHTML);

};

export default function ServiceAccessPage() {
	return(
		<React.Fragment>
			{getRender()}
		</React.Fragment>
	);
	// 	<div dangerouslySetInnerHTML={{ __html: bodyHtml.innerHTML }} />
}
