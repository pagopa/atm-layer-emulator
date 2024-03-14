/* eslint-disable prefer-const */
/* eslint-disable functional/immutable-data */
/* eslint-disable guard-for-in */
/* eslint-disable functional/no-let */
export function click():void{
	console.log("quick click");
}

export function parseResponse(jsonResponse:any){
	if(jsonResponse.task != null){
		const taskId = jsonResponse.task.id;	
		
		let template ="";
		if (jsonResponse.task.template){
			template = jsonResponse.task.template.content;
		};
		const timeout = jsonResponse.task.timeout;
	
	
		if (template != null){
		
			const newDocument = (new DOMParser).parseFromString(atob(template), "text/html");
		
			const buttons=newDocument.querySelectorAll("button,li");	
			
	
			for(let i = 0; i < buttons.length; i++)  {
			   buttons[i].setAttribute("onclick", "next();");
			}   

			for (let button in jsonResponse.task.buttons){
				newDocument?.getElementById(jsonResponse.task.buttons[button].id)?.setAttribute("onclick", "next('"+JSON.stringify(jsonResponse.task.buttons[button].data)+"');");
			}
	
			document.body.innerHTML = newDocument.body.innerHTML;
		}
		// if (timeout != null && timeout!=0){
		// 	timeoutTimer = setTimeout(next, timeout*1000,JSON.stringify(jsonResponse.task.onTimeout));
		// 	countDownDate  = new Date().getTime()+timeout*1000;
		// 	var elemDiv = document.createElement('div');
		// 	elemDiv.id = "countdown";
		// 	elemDiv.style.cssText = 'opacity:0.8;position: fixed;bottom: 0;right: 0;';
		// 	document.body.appendChild(elemDiv);		
		// 	x;
		// }
	
		// var command = jsonResponse.task.command;
		// if (command!= null){
		// 	if(command ==="SCAN_BIIL_DATA"){
		// 		var result = prompt("Inserisci codice scansionato:","UEFHT1BBfDAwMnwwMTIzNDU2Nzg5MDEyMzQ1Njd8MDAwMDAwMDAyMDF8MTAwMDA");
		// 		if (result != null){
		// 			next("{\"result\":\"OK\",\"scanData\":\""+result+"\"}");
		// 		} else {
		// 			next("{\"result\":\"KO\"}");
		// 		}
		// 	} else if(command ==="AUTHORIZE"){			
		// 		if (!confirm("Autorizzare il pagamento di"+(jsonResponse.task.data.totalAmount/100)+" ? ")){		
		// 			//	if(confirm("Esito Dubbio? ")){
		// 			//		next("{\"authResult\":\"KO_DUBBIO\"}");
		// 			//	} else {
		// 			next("{\"result\":\"KO\"}");
		// 			//	}
		// 		} else{
		// 			next("{\"result\":\"OK\"}");
		// 		}
		// 	} else if (command ==="PRINT_RECEIPT"){
		// 		var scontrino = jsonResponse.task.receiptTemplate;
		// 		if (scontrino){  
		// 			setTimeout(function() {
		// 				const newDocumentReceipt = (new DOMParser).parseFromString(atob(scontrino), 'text/html');
		//    var wnd = window.open();
		// 				//wnd.document.write(atob(scontrino));   
		// 				let el = wnd.document.createElement('style');
		// 				//el.type = 'text/css';
		// 				el.innerText = 'body {border: 2px black solid;display: flex;flex-direction: column;width: 600px;margin-left:auto;margin-right:auto;font-family: Courier New, monospace; font-size: 23px;} p {display: flex;flex-wrap: wrap;margin-bottom: 0px; margin-left: 25px;margin-right: 25px;} .left {text-align: left; } .right {text-align: right; } .center {text-align: center; } .bold {font-weight: bold;} span{flex: 1; white-space: pre-line;-ms-word-wrap: break-word;}span:hover{border: 1px black dotted; } span.col-1 {flex: 0 0 8.33%; } span.col-2 {flex: 0 0 16.67%; } span.col-3 {flex: 0 0 25%; } span.col-4 {flex: 0 0 33.33%; } span.col-5 {flex: 0 0 41.67%; } span.col-6 {flex: 0 0 50%; } span.col-7 {flex: 0 0 58.33%; } span.col-8 {flex: 0 0 66.67%;} span.col-9 {flex: 0 0 75%;} span.col-10 {flex: 0 0 83.33%;} span.col-11 {flex: 0 0 91.67%;} span.col-12 {flex: 0 0 100%;}';
		// 				wnd.document.head.appendChild(el);
		// 				wnd.document.body.innerHTML = newDocumentReceipt.body.innerHTML;
		// 				wnd.document.close()
		// 				next("{\"result\":\"OK\"}");
		// 			}, 3000);			
								
		// 		}
			
		// 	}if (command ==="END"){
		// 		next("{\"result\":\"OK\"}");
		// 	}
		// }
	} else {
		history.back();
	}
}