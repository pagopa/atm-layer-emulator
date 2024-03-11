/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { Link } from "@mui/material";
import { generatePath } from "react-router-dom";
import ROUTES from "../../routes";


export const resetErrors = (errors: any, setErrors: any, field: string | number) => {
	if (field) {
		// reset errore specifico field
		if (errors[field]) {
			setErrors((prevErrors: { [x: string]: any }) => {
				delete prevErrors[field];
				return { ...prevErrors };
			});
		}
	} else {
		// reset di tutti gli errori dei field
		setErrors((prevErrors: any) => {
			let newErr: any;
			for (let e of Object.keys(prevErrors)) {
				delete newErr[e];
				newErr = { ...newErr };
			}
			return newErr;
		});
	}
};

export const handleSnackbar = (
	success: boolean,
	setMessage: React.Dispatch<React.SetStateAction<any>>,
	setSeverity: React.Dispatch<React.SetStateAction<any>>,
	setTitle: React.Dispatch<React.SetStateAction<any>>,
	setOpenSnackBar: React.Dispatch<React.SetStateAction<any>>,
	valueMessage?: string
) => {
	setSeverity(success ? "success" : "error");
	setMessage(success ? "" : valueMessage ? valueMessage : "Operazione fallita");
	setTitle(success ? "Successo" : "Errore");
	setOpenSnackBar(true);
};