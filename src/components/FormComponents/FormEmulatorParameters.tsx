/* eslint-disable functional/immutable-data */
import React, { useContext, useEffect, useState } from "react";
import {
	Avatar,
	FormControlLabel,
	Grid,
	ListItemAvatar,
	ListItemText,
	MenuItem,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Ctx } from "../../DataContext";
import { IbanDto, IbanListDto, PanDto, PanInfoDto, ParametersDto } from "../model/ParametersModel";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { TASK_MAIN } from "../../commons/endpoints";
import {
	ACQUIRER_ID_LENGTH,
	CODE_LENGTH,
	FISCAL_CODE_LENGTH,
	TERMINAL_BRANCH_LENGTH,
} from "../../commons/constants";
import ROUTES from "../../routes";
import { getCompletePathImage } from "../../utils/Commons";
import FormTemplate from "./template/FormTemplate";
import PanInfoCard from "./PanInfoCard";
import IbanInfoCard from "./IbanInfo";
import formFunctions from "./FormFunctions";

export const FormEmulatorParameters = () => {
	const iconBaseUrl = process.env.REACT_APP_CDN_BASEURL;
	const [loadingButton, setLoadingButton] = useState(false);

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
		setPanInfo,
		setIbanList
	} = useContext(Ctx);
	const [openFirstCard, setOpenFirstCard] = useState(false);
	const [openSecondCard, setOpenSecondCard] = useState(false);
	const navigate = useNavigate();

	const availableCircuits = [
		{ id: 0, value: "BANCOMAT", label: "Bancomat", icon: getCompletePathImage("BANCOMAT.svg") },
		{ id: 1, value: "MASTERCARD", label: "Mastercard", icon: getCompletePathImage("MASTERCARD.svg") },
		{ id: 2, value: "VISA", label: "Visa", icon: getCompletePathImage("VISA.svg") },
	];

	const multiSelectMenuItems = () => availableCircuits.map((circuit) => (
		<MenuItem key={circuit.id} value={circuit.value} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
			<ListItemAvatar>
				<Avatar alt={circuit.label} variant="rounded" sx={{ height: "25px" }} > 
					<CreditCardIcon fontSize="small" />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={circuit.label} data-testid={`circuits-select-${circuit.label}`} />
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

	const {
		handleChange,
		handleChangePanInfoCards,
		handleChangeIbanList,
		handleChangeMultiSelectCard,
		validateForm,
		validatePanInfoForm,
		validateIbanForm }
		= formFunctions(setFormData,
			setFormDataPanInfoCards,
			setFormDataIbanList,
			setErrors,
			setPanInfoErrors,
			setIbanListErrors,
			setTouchInterface,
			errors,
			formData,
			formDataPanInfoCards,
			formDataIbanList,
			panInfoErrors,
			ibanListErrors
		);

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
						inputProps={{ maxLength: ACQUIRER_ID_LENGTH, "data-testid": "acquirerId-test" }}
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
						<PanInfoCard
							key={index}
							card={card}
							index={index}
							panInfoErrors={panInfoErrors}
							multiSelectMenuItems={multiSelectMenuItems}
							openFirstCard={openFirstCard}
							openSecondCard={openSecondCard}
							setOpenFirstCard={setOpenFirstCard}
							setOpenSecondCard={setOpenSecondCard}
							handleChangePanInfoCards={handleChangePanInfoCards}
							handleChangeMultiSelectCard={handleChangeMultiSelectCard}
							formDataPanInfoCards={formDataPanInfoCards}
							optionalPaymentMethodPanManagment={optionalPaymentMethodPanManagment}
						/>
					))
				}

				{
					formDataIbanList.IBANlist.map((iban: IbanDto, index: number) => (
						<IbanInfoCard
							key={index}
							iban={iban}
							index={index}
							ibanListErrors={ibanListErrors}
							handleChangeIbanList={handleChangeIbanList}
							formDataIbanList={formDataIbanList}
							optionalPaymentMethodIbanManagment={optionalPaymentMethodIbanManagment}
						/>
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
								data-testid="printer-test"
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
						control={<Switch
							checked={touchInterface}
							onChange={handleChange}
							name="touch"
							data-testid="touch-test"
						/>}
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
