/* eslint-disable functional/immutable-data */
import { useContext } from "react";
import parse from "html-react-parser";
import React from "react";
import { Ctx } from "../../DataContext";
import { decodeRenderHtml } from "../../components/DecodeRenderHtml/decodeRenderHtml";


const ServiceAccessPage = () => {

	const { responseProcess } = useContext(Ctx);
	console.log("template",responseProcess?.task?.template?.content);
	const bodyHtml = decodeRenderHtml(responseProcess?.task?.template?.content);
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

	const headerRow = document.createElement("div");
	if (headerRow) {
		// aggiunta dello stile mui-row all'elemento appena creato
		headerRow.classList.add("mui-row");
	}
	
	const logoColumn = document.createElement("div");
	if(logoColumn) {
		// Aggiunta dello stile alla colonna che rendiamo md-5
		logoColumn.classList.add("mui-col-md-5");
		// "Appendere" all'elemento padre rowButtons l'elemento della colonna
		headerRow.appendChild(logoColumn);
	}

	const logoElement = bodyHtml.querySelector("#logo");
	if (logoElement) {
		// "Appendere" all'elemento padre buttonPaymentColumn l'elemento figlio con id "pagamentoAviso"
		logoColumn.appendChild(logoElement);
	}

	const descColumn = document.createElement("div");
	if(descColumn) {
		// Aggiunta dello stile alla colonna che rendiamo md-5
		descColumn.classList.add("mui-col-md-5");
		// "Appendere" all'elemento padre rowButtons l'elemento della colonna
		headerRow.appendChild(descColumn);
	}

	const descElement = bodyHtml.querySelector("h1");
	if (descElement) {
		// "Appendere" all'elemento padre buttonPaymentColumn l'elemento figlio con id "pagamentoAviso"
		descColumn.appendChild(descElement);
	}

	grid.appendChild(headerRow);

	const titleRow = document.createElement("div");
	if (titleRow) {
		// aggiunta dello stile mui-row all'elemento appena creato
		titleRow.classList.add("mui-row");
	}

	const titleCol = document.createElement("div");
	if(titleCol) {
		titleCol.classList.add("mui-col-md-8");
		titleRow.appendChild(titleCol);
	}
	
	const titleElement = bodyHtml.querySelector("h2");
	if(titleElement) {
		// "Appendere" all'elemento padre rowButtons l'elemento della colonna
		titleCol.appendChild(titleElement);
	}

	grid.appendChild(titleRow);

	const subtitleRow = document.createElement("div");
	if (subtitleRow) {
		// aggiunta dello stile mui-row all'elemento appena creato
		subtitleRow.classList.add("mui-row");
	}

	const subtitleCol = document.createElement("div");
	if(subtitleCol) {
		subtitleCol.classList.add("mui-col-md-8");
		subtitleRow.appendChild(subtitleCol);
	}
	
	const subtitleElement = bodyHtml.querySelector("h3");
	if(subtitleElement) {
		// "Appendere" all'elemento padre rowButtons l'elemento della colonna
		subtitleCol.appendChild(subtitleElement);
	}

	grid.appendChild(subtitleRow);

	// creazione di un elemento div (una nuova row per la griglia)
	const rowButtons = document.createElement("div");
	if (rowButtons) {
		// aggiunta dello stile mui-row all'elemento appena creato
		rowButtons.classList.add("mui-row");
	}

	// "Appendere" all'elemento padre grid l'elemento figlio row
	grid.appendChild(rowButtons);

	// creazione di un elemento div (una nuova colonna per la row della griglia)
	const buttonPaymentColumn = document.createElement("div");
	if(buttonPaymentColumn) {
		// Aggiunta dello stile alla colonna che rendiamo md-5
		buttonPaymentColumn.classList.add("mui-col-md-5");
		buttonPaymentColumn.setAttribute("style", "padding: 0px");
		// "Appendere" all'elemento padre rowButtons l'elemento della colonna
		rowButtons.appendChild(buttonPaymentColumn);
	}


	// Prendersi l'elemento con id "pagamentoAviso"
	const buttonPayment = bodyHtml.querySelector("#pagamentoAviso");
	if (buttonPayment) {
		buttonPayment.setAttribute("style", "width: 100%");
		// "Appendere" all'elemento padre buttonPaymentColumn l'elemento figlio con id "pagamentoAviso"
		buttonPaymentColumn.appendChild(buttonPayment);
	}

	// creazione di un elemento div (una nuova colonna per la row della griglia)
	const buttonInitiativeIDPayColumn = document.createElement("div");
	if(buttonInitiativeIDPayColumn) {
		// Aggiunta dello stile alla colonna che rendiamo md-5
		buttonInitiativeIDPayColumn.classList.add("mui-col-md-5");
		buttonInitiativeIDPayColumn.setAttribute("style", "padding: 0px; margin-left: 16px");
		// "Appendere" all'elemento padre rowButtons l'elemento della colonna
		rowButtons.appendChild(buttonInitiativeIDPayColumn);
	}

	const buttonInitiativeIDPay = bodyHtml.querySelector("#iniziativeIDPay");
	if(buttonInitiativeIDPay) {
		buttonInitiativeIDPay.setAttribute("style", "width: 100%");
		buttonInitiativeIDPayColumn.appendChild(buttonInitiativeIDPay);
	}

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

	return(
		<React.Fragment>
			{parse(bodyHtml.innerHTML)}
		</React.Fragment>
	);
};

export default ServiceAccessPage;
