import React, { useContext, useEffect, useState } from "react";
import {
	Box,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { IbanDto, IbanListDto, PanDto, PanInfoDto, ParametersDto } from "../model/ParametersModel";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { resetErrors } from "../Commons/Commons";
import { TASK_MAIN } from "../../commons/endpoints";
import {
	ACQUIRER_ID_LENGTH,
	CODE_LEGTH,
	FISCAL_CODE_LENGTH,
	PAN_MAX_LENGHT,
	TERMINAL_BRANCH_LENGTH,
} from "../../commons/constants";
import checks from "../../utils/checks";
import ROUTES from "../../routes";
import FormTemplate from "./template/FormTemplate";

export const FormEmulatorParameters = () => {
	const [loadingButton, setLoadingButton] = useState(false);
	const { cfIsValid } = checks();

	const panInfoFirstCard: PanDto = {
		pan: "1234567891234567",
		circuits: ["VISA"],
		bankName: "ISYBANK"
	};

	const panInfoSecondCard: PanDto = {
		pan: "8234567891234565",
		circuits: ["BANCOMAT", "VISA"],
		bankName: "INTESA"
	};

	const panInfoCards: PanInfoDto = {
		panInfo: [panInfoFirstCard, panInfoSecondCard]
	};

	const firstIban: IbanDto = {
		IBAN: "IT12A1234512345123456789012",
		bankName: "INTESA"
	};

	const IbanList: IbanListDto = {
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

	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);
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
	const navigate = useNavigate();

	const circuits = [
		{ id: 0, value: "", label: "No circuito"},
		{ id: 1, value: "BANCOMAT", label: "Bancomat" },
		{ id: 2, value: "MASTERCARD", label: "Mastercard" },
		{ id: 3, value: "VISA", label: "Visa" },
	];

	useEffect(() => {
		validateForm();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
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

		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
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
					setPanInfo(panInfoCards);
					setIbanList(IbanList);
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
				<Grid xs={6} item my={1} px={1}>
					<TextField
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
				<Grid xs={6} item my={1} px={1}>
					<TextField
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
				<Grid xs={6} item my={1} px={1}>
					<TextField
						fullWidth
						id="code"
						name="code"
						label={"Codice"}
						placeholder={"0001"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.code)}
						helperText={errors.code}
						inputProps={{ maxLength: CODE_LEGTH }}
						defaultValue={initialValues.code}
					/>
				</Grid>
				<Grid xs={6} item my={1} px={1}>
					<TextField
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
				<Grid xs={6} item my={1} px={1}>
					<TextField
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
				<Grid item xs={12} ml={1} my={2} display={"flex"} justifyContent={"center"}>
					<Typography variant="body1" fontWeight="600">
						{"Inserire i dati bancari"}
					</Typography>
				</Grid>
				<Grid xs={6} item my={1} px={1}>
					<TextField
						fullWidth
						id="iban1"
						name="iban1"
						label={"Primo IBAN"}
						placeholder={"06789"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.iban1)}
						helperText={errors.iban1}
						// inputProps={{ maxLength: ACQUIRER_ID_LENGTH }}
						defaultValue={firstIban.IBAN}
					/>
				</Grid>
				<Grid xs={6} item my={1} px={1}>
					<TextField
						fullWidth
						id="bankNameIBAN1"
						name="bankNameIBAN1"
						label={"Prima Banca Associata IBAN"}
						placeholder={"ISYBANK"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.bankNameIBAN1)}
						helperText={errors.bankNameIBAN1}
						// inputProps={{ maxLength: FISCAL_CODE_LENGTH }}
						defaultValue={firstIban.bankName}
					/>
				</Grid>
				<Grid xs={6} item my={1} px={1}>
					<TextField
						fullWidth
						id="pan1"
						name="pan1"
						label={"Primo PAN"}
						placeholder={"1234567891234567"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.pan1)}
						helperText={errors.pan1}
						inputProps={{ maxLength: PAN_MAX_LENGHT }}
						defaultValue={panInfoFirstCard.pan}
					/>
				</Grid>
				<Grid xs={6} item my={1} px={1}>
					<FormControl fullWidth>
						<InputLabel>
							Circuito di pagamento primo PAN
						</InputLabel>
						<Select
							fullWidth
							id="circuit1"
							name="circuit1"
							size="small"
							onChange={handleChange}
							error={Boolean(errors.code)}
							defaultValue={panInfoFirstCard.circuits[0]}
						>
							{circuits.map((item) => (
								<MenuItem key={item.id} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid xs={6} item my={1} px={1}>
					<TextField
						fullWidth
						id="bankNamePAN1"
						name="bankNamePAN1"
						label={"Prima Banca associata PAN"}
						placeholder={"ISYBANK"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.bankNamePAN1)}
						helperText={errors.bankNamePAN1}
						// inputProps={{ maxLength: FISCAL_CODE_LENGTH }}
						defaultValue={panInfoFirstCard.bankName}
					/>
				</Grid>
			
				<Grid
					container
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
		</FormTemplate>
	);
};

export default FormEmulatorParameters;
