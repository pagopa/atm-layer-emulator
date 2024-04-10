/* eslint-disable functional/immutable-data */
import React, { useContext, useEffect, useState } from "react";
import {
	Avatar,
	Button,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	InputLabel,
	ListItemAvatar,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Ctx } from "../../DataContext";
import { IbanDto, IbanListDto, PanDto, PanInfoDto, ParametersDto } from "../model/ParametersModel";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { resetErrors } from "../Commons/Commons";
import { TASK_MAIN } from "../../commons/endpoints";
import {
	ACQUIRER_ID_LENGTH,
	CODE_LENGTH,
	FISCAL_CODE_LENGTH,
	IBAN_MAX_LENGTH,
	PAN_MAX_LENGTH,
	TERMINAL_BRANCH_LENGTH,
} from "../../commons/constants";
import checks from "../../utils/checks";
import ROUTES from "../../routes";
import FormTemplate from "./template/FormTemplate";
import PanInfoCard from "./PanInfoCard";
import IbanInfoCard from "./IbanInfo";

export const FormEmulatorParameters = () => {
	const [loadingButton, setLoadingButton] = useState(false);
	const { cfIsValid, ibanIsValid, panIsValid } = checks();

	const panInfoFirstCard: PanDto = {
		pan: "1234567891234567",
		circuits: ["VISA", "BANCOMAT"],
		bankName: "ISYBANK"
	};

	const panInfoSecondCard: PanDto = {
		pan: "",
		circuits: [],
		bankName: ""
	};

	const firstIban: IbanDto = {
		IBAN: "IT12A1234512345123456789012",
		bankName: "INTESA"
	};

	const secondIban: IbanDto = {
		IBAN: "",
		bankName: ""
	};

	const IbanListInitialValues: IbanListDto = {
		IBANlist: [firstIban]
	};

	const initialValues: ParametersDto = {
		acquirerId: "06789",
		branchId: "12345",
		code: "0001",
		terminalId: "64874412",
		fiscalCode: "SNNCNA88S04A567U",
		printer: "OK",
		scanner: "OK",
	};

	const panInfoInitialValues: PanInfoDto = {
		panInfo: [panInfoFirstCard]
	};

	const panInfoInitialErrors = {
		pan: "",
		circuits: "",
		bankName: ""
	};

	const ibanListInitialErrors = {
		IBAN: "",
		bankName: ""
	};

	const [formData, setFormData] = useState(initialValues);
	const [formDataPanInfoCards, setFormDataPanInfoCards] = useState(panInfoInitialValues);
	const [formDataIbanList, setFormDataIbanList] = useState(IbanListInitialValues);
	const [errors, setErrors] = useState<any>(initialValues);
	const [panInfoErrors, setPanInfoErrors] = useState<Array<any>>([panInfoInitialErrors]);
	const [ibanListErrors, setIbanListErrors] = useState<Array<any>>([ibanListInitialErrors]);

	const {
		abortController,
		setResponseProcess,
		setTransactionData,
		touchInterface,
		setTouchInterface,
		debugOn,
		setPanInfo,
		setIbanList
	} = useContext(Ctx);
	const [openFirstCard, setOpenFirstCard] = useState(false);
	const [openSecondCard, setOpenSecondCard] = useState(false);
	const navigate = useNavigate();

	const availableCircuits = [
		{ id: 0, value: "BANCOMAT", label: "Bancomat", icon: "https://d2xduy7tbgu2d3.cloudfront.net/files/ICON/BANCOMAT.svg" },
		{ id: 1, value: "MASTERCARD", label: "Mastercard" },
		{ id: 2, value: "VISA", label: "Visa", icon: "https://d2xduy7tbgu2d3.cloudfront.net/files/ICON/VISA.svg" },
	];

	const multiSelectMenuItems = () => availableCircuits.map((circuit) => (
		<MenuItem key={circuit.id} value={circuit.value} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
			<ListItemAvatar>
				{circuit?.icon ?
					<Avatar alt={circuit.label} src={circuit.icon} variant="rounded">
						{circuit.icon }
					</Avatar>
					:
					<Avatar alt={circuit.label} variant="rounded" sx={{height:"25px"}} >
						<CreditCardIcon fontSize="small" />
					</Avatar>
				}	
			</ListItemAvatar>
			<ListItemText primary={circuit.label} />
		</MenuItem>
	));

	const addOptionalPanPaymentMethod = () => {
		const newPanInfoCard = { ...formDataPanInfoCards };
		newPanInfoCard.panInfo.push(panInfoSecondCard);
		panInfoErrors.push(panInfoInitialErrors);
		setFormDataPanInfoCards(newPanInfoCard);
	};

	const removeAdditionalPanPaymentMethod = () => {
		const newPanInfoCard = { ...formDataPanInfoCards };
		newPanInfoCard.panInfo.splice(1);
		panInfoErrors.splice(1);
		setFormDataPanInfoCards(newPanInfoCard);
	};

	const addOptionalIbanPaymentMethod = () => {
		const newIbanList = { ...formDataIbanList };
		newIbanList.IBANlist.push(secondIban);
		ibanListErrors.push(ibanListInitialErrors);
		setFormDataIbanList(newIbanList);
	};

	const removeAdditionalIbanPaymentMethod = () => {
		const newIbanList = { ...formDataIbanList };
		newIbanList.IBANlist.splice(1);
		ibanListErrors.splice(1);
		setFormDataIbanList(newIbanList);
	};

	const optionalPaymentMethodPanManagment = () => {
		if (formDataPanInfoCards.panInfo.length === 1) {
			addOptionalPanPaymentMethod();
		} else {
			removeAdditionalPanPaymentMethod();
		}
	};

	const optionalPaymentMethodIbanManagment = () => {
		if (formDataIbanList.IBANlist.length === 1) {
			addOptionalIbanPaymentMethod();
		} else {
			removeAdditionalIbanPaymentMethod();
		}
	};

	useEffect(() => {
		validateForm();
		validatePanInfoForm();
		validateIbanForm();
	}, []);

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
			fiscalCode: formData.fiscalCode
				? cfIsValid(formData.fiscalCode)
					? ""
					: "Codice fiscale non valido"
				: "Campo obbligatorio",
		};

		setErrors(newErrors);

		return Object.values(newErrors).every((error) => !error);
	};


	const validatePanInfoForm = () => {
		const newPanInfoErrors: Array<any> = [];

		formDataPanInfoCards.panInfo.forEach((card: PanDto, index: number) => {
			const cardErrors = {
				pan: card.pan.trim() ? (panIsValid(card.pan) ? "" : "PAN non valido") : "Campo obbligatorio",
				circuits: card.circuits.length > 0 && card.circuits.length <= 2 ? "" : "Seleziona un massimo di due circuiti",
				bankName: card.bankName.trim() ? "" : "Campo obbligatorio"
			};

			newPanInfoErrors.push(cardErrors);
		});

		setPanInfoErrors(newPanInfoErrors);

		return newPanInfoErrors.every((errors) =>
			Object.values(errors).every((error) => !error)
		);
	};

	const validateIbanForm = () => {
		const newIbanListErrors: Array<any> = [];

		formDataIbanList.IBANlist.forEach((iban: IbanDto, index: number) => {
			const ibanErrors = {
				IBAN: iban.IBAN.trim() ? (ibanIsValid(iban.IBAN) ? "" : "IBAN non valido") : "Campo obbligatorio",
				bankName: iban.bankName.trim() ? "" : "Campo obbligatorio"
			};

			newIbanListErrors.push(ibanErrors);
		});

		setIbanListErrors(newIbanListErrors);

		return newIbanListErrors.every((errors) =>
			Object.values(errors).every((error) => !error)
		);
	};



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm() && validatePanInfoForm() && validateIbanForm()) {
			const date = new Date().toISOString().slice(0, -5);
			const postData = {
				data: {
					continue: true,
				},
				device: {
					bankId: formData.acquirerId,
					branchId: formData.branchId,
					channel: "ATM",
					code: formData.code,
					opTimestamp: date,
					peripherals: [
						{
							id: "PRINTER",
							name: "Receipt printer",
							status: formData.printer,
						},
						{
							id: "SCANNER",
							name: "Scanner",
							status: formData.scanner,
						},
					],
					terminalId: formData.terminalId,
				},
				fiscalCode: formData.fiscalCode,
			};

			setLoadingButton(true);
			try {
				const response = await fetchRequest({
					urlEndpoint: TASK_MAIN,
					method: "POST",
					abortController,
					body: postData,
					headers: { "Content-Type": "application/json" },
				})();
				setLoadingButton(false);

				if (response?.success) {
					setResponseProcess(response?.valuesObj);
					setTransactionData(formData);
					setPanInfo(formDataPanInfoCards);
					setIbanList(formDataIbanList);
					navigate(ROUTES.SERVICE_ACCESS);
				}
			} catch (error) {
				setLoadingButton(false);
				console.log("Response negative: ", error);
			}
		}
	};

	return (
		<FormTemplate handleSubmit={handleSubmit} loadingButton={loadingButton}>
			<Grid container item xs={12} display={"flex"}>
				<Grid item xs={12} ml={1} mb={2} display={"flex"} justifyContent={"center"}>
					<Typography variant="body1" fontWeight="600">
						{"Compilare tutti i campi per iniziare la simulazione"}
					</Typography>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<TextField
						required
						fullWidth
						id="acquirerId"
						name="acquirerId"
						label={"ID Banca"}
						placeholder={"06789"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.acquirerId)}
						helperText={errors.acquirerId}
						inputProps={{ maxLength: ACQUIRER_ID_LENGTH }}
						defaultValue={initialValues.acquirerId}
					/>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<TextField
						required
						fullWidth
						id="branchId"
						name="branchId"
						label={"ID Filiale"}
						placeholder={"12345"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.branchId)}
						helperText={errors.branchId}
						inputProps={{ maxLength: TERMINAL_BRANCH_LENGTH }}
						defaultValue={initialValues.branchId}
					/>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<TextField
						required
						fullWidth
						id="code"
						name="code"
						label={"Codice"}
						placeholder={"0001"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.code)}
						helperText={errors.code}
						inputProps={{ maxLength: CODE_LENGTH }}
						defaultValue={initialValues.code}
					/>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<TextField
						required
						fullWidth
						id="terminalId"
						name="terminalId"
						label={"ID Terminale"}
						placeholder={"64874412"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.terminalId)}
						helperText={errors.terminalId}
						inputProps={{ maxLength: TERMINAL_BRANCH_LENGTH }}
						defaultValue={initialValues.terminalId}
					/>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<TextField
						required
						fullWidth
						id="fiscalCode"
						name="fiscalCode"
						label={"Codice Fiscale"}
						placeholder={"RSSMRA74D22A001Q"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.fiscalCode)}
						helperText={errors.fiscalCode}
						inputProps={{ maxLength: FISCAL_CODE_LENGTH }}
						defaultValue={initialValues.fiscalCode}
					/>
				</Grid>

				{
					formDataPanInfoCards.panInfo.map((card: PanDto, index: number) => (
					// 	<React.Fragment key={index}>
					// 		{index === 0 && ( // Mostra il titolo solo per il primo oggetto dell'array
					// 			<Grid item xs={12} ml={1} my={2} display={"flex"} justifyContent={"center"} key={`grid${index}`}>
					// 				<Typography variant="body1" fontWeight="600">
					// 					{index === 0 ? "Inserire i dati del pan principali" : "Indrire i dati del pan opzionali"}
					// 				</Typography>
					// 			</Grid>
					// 		)}

						// 		<Grid xs={4} item my={1} px={1}>
						// 			<TextField
						// 				required
						// 				key={`pan${index}`}
						// 				fullWidth
						// 				id="pan"
						// 				name={"pan"}
						// 				label={"PAN"}
						// 				placeholder={"1234567891234567"}
						// 				size="small"
						// 				value={card?.pan}
						// 				onChange={(e) => handleChangePanInfoCards(e, index)}
						// 				inputProps={{ maxLength: PAN_MAX_LENGTH }}
						// 				error={Boolean(panInfoErrors[index].pan)}
						// 				helperText={panInfoErrors[index].pan}
						// 			/>
						// 		</Grid>
						// 		<Grid xs={4} item my={1} px={1}>
						// 			<TextField
						// 				required
						// 				key={`bankPan${index}`}
						// 				fullWidth
						// 				id="bankPan"
						// 				name="bankName"
						// 				label={"Banca PAN"}
						// 				placeholder={"ISYBANK"}
						// 				size="small"
						// 				value={card?.bankName}
						// 				onChange={(e) => handleChangePanInfoCards(e, index)}
						// 				error={Boolean(panInfoErrors[index].bankName)}
						// 				helperText={panInfoErrors[index].bankName}
						// 			/>
						// 		</Grid>
						// 		<Grid xs={4} item my={1} px={1}>
						// 			<FormControl focused={index === 0 ? openFirstCard : openSecondCard} error={Boolean(panInfoErrors[index].circuits)} fullWidth>
						// 				<InputLabel id="circuits-label">Circuiti</InputLabel>
						// 				<Select
						// 					required
						// 					size="small"
						// 					labelId="circuits-label"
						// 					id="multiple-checkbox-card"
						// 					name="multiple-checkbox-card"
						// 					multiple
						// 					value={card?.circuits ?? []}
						// 					onChange={(e) => handleChangeMultiSelectCard(e, index)}
						// 					input={<OutlinedInput label="Name" />}
						// 					renderValue={(selected) => selected.join(", ")}
						// 					onOpen={() => index === 0 ? setOpenFirstCard(true) : setOpenSecondCard(true)}
						// 					onClose={() => index === 0 ? setOpenFirstCard(false) : setOpenSecondCard(false)}
						// 					open={index === 0 ? openFirstCard : openSecondCard}
						// 				>
						// 					{multiSelectMenuItems()}
						// 				</Select>
						// 				<FormHelperText>{panInfoErrors[index].circuits}</FormHelperText>
						// 			</FormControl>
						// 		</Grid>

						// 		{index === 0 && (
						// 			<Grid container item xs={12} ml={1} my={2} display={"flex"} justifyContent={"flex-start"} key={`button${index}`}>
						// 				<Grid item xs={6}>
						// 					<Button id="visible-section-btn" variant="text" onClick={() => {
						// 						optionalPaymentMethodPanManagment();
						// 					}}>
						// 						{
						// 							formDataPanInfoCards.panInfo.length === 1 ? "Aggiungi metodo di pagamento pan" : "Rimuovi metodo di pagamento pan"
						// 						}
						// 					</Button>
						// 				</Grid>
						// 			</Grid>)
						// 		}


						// 	</React.Fragment>
						// )
						
						<PanInfoCard key={index} card={card} index={index} panInfoErrors={panInfoErrors} multiSelectMenuItems={multiSelectMenuItems} openFirstCard={openFirstCard} openSecondCard={openSecondCard} setOpenFirstCard={setOpenFirstCard} 
							setOpenSecondCard={setOpenSecondCard} handleChangePanInfoCards={handleChangePanInfoCards} handleChangeMultiSelectCard={handleChangeMultiSelectCard} formDataPanInfoCards={formDataPanInfoCards} optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}/>
					))
				}

				{
					formDataIbanList.IBANlist.map((iban: IbanDto, index: number) => (
						// <React.Fragment key={`ibanFragmnet${index}`}>
						// 	{index === 0 && ( // Mostra il titolo solo per il primo oggetto dell'array
						// 		<Grid item xs={12} ml={1} my={2} display={"flex"} justifyContent={"center"} key={`grid${index}`}>
						// 			<Typography variant="body1" fontWeight="600">
						// 				{index === 0 ? "Inserire i dati dell'Iban principali" : "Indrire i dati dell'Iban opzionali"}
						// 			</Typography>
						// 		</Grid>
						// 	)}
						// 	<Grid xs={4} item my={1} px={1}>
						// 		<TextField
						// 			required
						// 			key={`iban${index}`}
						// 			fullWidth
						// 			id="IBAN"
						// 			name="IBAN"
						// 			label={"IBAN"}
						// 			placeholder={"IBAN"}
						// 			size="small"
						// 			value={iban?.IBAN}
						// 			onChange={(e) => handleChangeIbanList(e, index)}
						// 			inputProps={{ maxLength: IBAN_MAX_LENGTH }}
						// 			error={Boolean(ibanListErrors[index].IBAN)}
						// 			helperText={ibanListErrors[index]?.IBAN}
						// 		/>
						// 	</Grid>
						// 	<Grid xs={4} item my={1} px={1}>
						// 		<TextField
						// 			required
						// 			key={`bankName${index}`}
						// 			fullWidth
						// 			id="banca-iban"
						// 			name="bankName"
						// 			label={"Banca IBAN"}
						// 			placeholder={"es: ISYBANK"}
						// 			size="small"
						// 			value={iban?.bankName}
						// 			onChange={(e) => handleChangeIbanList(e, index)}
						// 			error={Boolean(ibanListErrors[index].bankName)}
						// 			helperText={ibanListErrors[index]?.bankName}
						// 		/>
						// 	</Grid>

						// 	{index === 0 && (<Grid container item xs={12} ml={1} my={2} display={"flex"} justifyContent={"flex-start"} key={`buttonIban${index}`}>
						// 		<Button id="visible-section-btn" variant="text" onClick={() => {
						// 			optionalPaymentMethodIbanManagment();
						// 		}}>
						// 			{
						// 				formDataIbanList.IBANlist.length === 1 ? "Aggiungi metodo di pagamento Iban" : "Rimuovi metodo di pagamento Iban"
						// 			}
						// 		</Button>
						// 	</Grid>)
						// 	}
						// </React.Fragment>
						<IbanInfoCard key={index} iban={iban} index={index} ibanListErrors={ibanListErrors} handleChangeIbanList={handleChangeIbanList} formDataIbanList={formDataIbanList} optionalPaymentMethodIbanManagment={optionalPaymentMethodIbanManagment}/>
					))
				}

				<Grid
					container
					item
					xs={12}
					display="flex"
					flexDirection={"row"}
					justifyContent={"space-between"}
				>
					<FormControlLabel
						id="printer"
						value="OK"
						control={
							<Switch
								checked={formData?.printer === "OK" ? true : false}
								onChange={handleChange}
								name="printer"
							/>
						}
						label="Stampante"
						labelPlacement="start"
						sx={{ ml: 1 }}
					/>
					<FormControlLabel
						id="scanner"
						value="OK"
						control={
							<Switch
								checked={formData?.scanner === "OK" ? true : false}
								onChange={handleChange}
								name="scanner"
							/>
						}
						label="Scanner"
						labelPlacement="start"
						sx={{ ml: 1 }}
					/>
					<FormControlLabel
						id="touchLayout"
						value="touch"
						control={<Switch checked={touchInterface} onChange={handleChange} name="touch" />}
						label="ATM Touch"
						labelPlacement="start"
						sx={{ ml: 1, mr: 0 }}
					/>
				</Grid>
			</Grid>
		</FormTemplate >
	);
};

export default FormEmulatorParameters;
