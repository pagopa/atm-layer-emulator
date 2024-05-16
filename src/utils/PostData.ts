import { useContext } from "react";
import { Ctx } from "../DataContext";



const date = new Date().toISOString().slice(0, -5);
export const postData = (params: any, responseProcess:any, transactionData:any, outerData?:any) => (
	{
		data: {
			...params
		},
		...outerData,
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