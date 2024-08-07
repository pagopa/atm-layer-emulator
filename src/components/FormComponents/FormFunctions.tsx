/* eslint-disable functional/immutable-data */

import { SelectChangeEvent } from "@mui/material";
import { IbanDto, PanDto } from "../model/ParametersModel";
import checks from "../../utils/checks";
import { resetErrors } from "../../utils/Commons";

const formFunctions = (
	setFormData: React.Dispatch<React.SetStateAction<any>>,
	setFormDataPanInfoCards: React.Dispatch<React.SetStateAction<any>>,
	setFormDataIbanList: React.Dispatch<React.SetStateAction<any>>,
	setErrors: React.Dispatch<React.SetStateAction<any>>,
	setPanInfoErrors: React.Dispatch<React.SetStateAction<any>>,
	setIbanListErrors: React.Dispatch<React.SetStateAction<any>>,
	setTouchInterface: any,
	errors: any,
	formData: any,
	formDataPanInfoCards: any,
	formDataIbanList: any,
	panInfoErrors: Array<any>,
	ibanListErrors: Array<any>
) => {
	const { cfIsValid, ibanIsValid, panIsValid } = checks();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const target = e.target as HTMLInputElement;
		const { name, value, checked } = target;
		resetErrors(errors, setErrors, name);

		if (name === "printer" || name === "scanner" || name === "touch") {
			setFormData((prevFormData: any) => ({ ...prevFormData, [name]: checked ? "OK" : "KO" }));

			if (name === "touch") {
				setTouchInterface(checked);
			}
		} else {
			setFormData((prevFormData: any) => ({
				...prevFormData,
				[name]: value,
			}));
		}
	};

	const handleChangePanInfoCards = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const target = e.target as HTMLInputElement;
		const { name, value } = target;

		resetErrors(panInfoErrors, setPanInfoErrors, name);

		setFormDataPanInfoCards((prevFormDataPanInfoCards: any) => ({
			...prevFormDataPanInfoCards,
			panInfo: prevFormDataPanInfoCards.panInfo.map((card: any, i: number) =>
				i === index ? { ...card, [name]: value } : card
			),
		}));
	};

	const handleChangeIbanList = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const target = e.target as HTMLInputElement;
		const { name, value } = target;

		resetErrors(ibanListErrors, setIbanListErrors, name);

		setFormDataIbanList((prevFormDataIbanList: any) => ({
			...prevFormDataIbanList,
			IBANlist: prevFormDataIbanList.IBANlist.map((iban: IbanDto, i: number) =>
				i === index ? { ...iban, [name]: value } : iban
			),
		}));
	};

	const handleChangeMultiSelectCard = (event: SelectChangeEvent<Array<string>>, cardIndex: number) => {
		const {
			target: { value, name },
		} = event;

		const updatedFormDataPanInfoCards = { ...formDataPanInfoCards };
		const formattedValue = Array.isArray(value) ? value : [value];

		if (name === "multiple-checkbox-card") {
			// eslint-disable-next-line functional/immutable-data
			updatedFormDataPanInfoCards.panInfo[cardIndex] = {
				...updatedFormDataPanInfoCards.panInfo[cardIndex],
				circuits: formattedValue,
			};
		}

		setFormDataPanInfoCards(updatedFormDataPanInfoCards);
	};

	const validateForm = () => {
		const newErrors = {
			acquirerId: formData.acquirerId ? "" : "Campo obbligatorio",
			branchId: formData.branchId ? "" : "Campo obbligatorio",
			code: formData.code ? "" : "Campo obbligatorio",
			terminalId: formData.terminalId ? "" : "Campo obbligatorio",
			fiscalCode: formData.fiscalCode ? cfIsValid(formData.fiscalCode) ? "" : "Codice fiscale non valido" : ""
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};

	const validatePanInfoForm = () => {
		const newPanInfoErrors: Array<any> = [];
		// eslint-disable-next-line functional/no-let
		let isFormValid = true;
	
		formDataPanInfoCards.panInfo.forEach((panCard: any) => {
			if (Object.values(panCard).some((panCardvalue: any) => panCardvalue.length > 0)) {
				const cardErrors = {
					pan: panCard.pan.trim() ? (panIsValid(panCard.pan) ? "" : "PAN non valido") : "Campo obbligatorio",
					circuits: panCard.circuits.length > 0 ? "" : "Seleziona almeno un circuito",
					bankName: panCard.bankName.trim() ? "" : "Campo obbligatorio"
				};
	
				newPanInfoErrors.push(cardErrors);
	
				if (!Object.values(cardErrors).every((error) => !error)) {
					isFormValid = false;
				}
			}
		});
	
		setPanInfoErrors(newPanInfoErrors);
		return isFormValid;
	};

	const validateIbanForm = () => {
		const newIbanListErrors: Array<any> = [];
		// eslint-disable-next-line functional/no-let
		let isFormValid = true;
		formDataIbanList.IBANlist.forEach((iban: any) => {
			if(Object.values(iban).some((ibanValue: any) => ibanValue.length > 0)) {
				console.log("iban", iban);
				const ibanErrors = {
					IBAN: iban.IBAN.trim() ? (ibanIsValid(iban.IBAN) ? "" : "IBAN non valido") : "Campo obbligatorio",
					bankName: iban.bankName.trim() ? "" : "Campo obbligatorio"
				};

				newIbanListErrors.push(ibanErrors);
				if(!Object.values(ibanErrors).every((error) => !error)) {
					isFormValid = false;
				}
			} 
		});

		setIbanListErrors(newIbanListErrors);
		return isFormValid;
	};

	return {
		handleChange,
		handleChangePanInfoCards,
		handleChangeIbanList,
		handleChangeMultiSelectCard,
		validateForm,
		validatePanInfoForm,
		validateIbanForm,
	};
};

export default formFunctions;