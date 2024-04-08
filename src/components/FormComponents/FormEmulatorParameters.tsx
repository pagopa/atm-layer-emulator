import React, { useContext, useEffect, useState } from "react";
import {
	Avatar,
	Button,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	ListItemAvatar,
	ListItemText,
	MenuItem,
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
		circuits: ["VISA", "BANCOMAT", "MASTERCARD"],
		bankName: "ISYBANK"
	};

	const panInfoSecondCard: PanDto = {
		pan: "",
		circuits: [],
		bankName: ""
	};

	const panInfoCards: PanInfoDto = {
		panInfo: [panInfoFirstCard, panInfoSecondCard]
	};

	const firstIban: IbanDto = {
		IBAN: "IT12A1234512345123456789012",
		bankName: "INTESA"
	};

	const secondIban: IbanDto = {
		IBAN: "",
		bankName: ""
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
		panInfo,
		setIbanList
	} = useContext(Ctx);
	const panInfoArray = panInfo as PanInfoDto;
	const [firstCardCircuits, setFirstCardCircuits] = useState<Array<string>>(panInfoFirstCard.circuits);
	const [secondCardCircuits, setSecondCardCircuits] = useState<Array<string>>(panInfoSecondCard.circuits);
	const [openFirstCard, setOpenFirstCard] = useState(false);
	const [openSecondCard, setOpenSecondCard] = useState(false);
	const [optionalPaymentMethod, setOptionalPaymentMethod] = useState(false);
	const navigate = useNavigate();

	const availableCircuits = [
		{ id: 0, value: "BANCOMAT", label: "Bancomat", icon: "https://d2xduy7tbgu2d3.cloudfront.net/files/ICON/BANCOMAT.svg" },
		{ id: 1, value: "MASTERCARD", label: "Mastercard", icon: <CreditCardIcon fontSize="small" /> },
		{ id: 2, value: "VISA", label: "Visa", icon: "https://d2xduy7tbgu2d3.cloudfront.net/files/ICON/VISA.svg" },
	];

	const multiSelectMenuItems = () => availableCircuits.map((circuit) => (
		<MenuItem key={circuit.id} value={circuit.value} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
			<ListItemAvatar>
				<Avatar alt={circuit.label} src={typeof circuit.icon === "string" ? circuit.icon : undefined} variant="rounded">
					{typeof circuit.icon !== "string" ? circuit.icon : null}
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={circuit.label} />
		</MenuItem>
	));

	const setVisible = () => setOptionalPaymentMethod(!optionalPaymentMethod);

	useEffect(() => {
		validateForm();
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

	const handleChangeMultiSelectCard = (event: SelectChangeEvent<Array<string>>, setCardCircuits: React.Dispatch<React.SetStateAction<Array<string>>>) => {
		const {
			target: { value },
		} = event;
		setCardCircuits(typeof value === "string" ? value.split(",") : value,);
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
				<Grid xs={4} item my={1} px={1}>
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
				<Grid xs={4} item my={1} px={1}>
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
				<Grid xs={4} item my={1} px={1}>
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
				<Grid xs={4} item my={1} px={1}>
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
				<Grid xs={4} item my={1} px={1}>
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
						{"Inserire i metodi di pagamento principali"}
					</Typography>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<TextField
						fullWidth
						id="pan1"
						name="pan1"
						label={"PAN"}
						placeholder={"1234567891234567"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.pan1)}
						helperText={errors.pan1}
						inputProps={{ maxLength: PAN_MAX_LENGHT }}
						defaultValue={panInfoFirstCard.pan}
					/>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<TextField
						fullWidth
						id="bankPan1"
						name="bankPan1"
						label={"Banca PAN"}
						placeholder={"es: ISYBANK"}
						size="small"
						onChange={handleChange}
						error={Boolean(errors.pan1)}
						helperText={errors.pan1}
						defaultValue={panInfoFirstCard.pan}
					/>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<FormControl focused={openFirstCard} fullWidth>
						<InputLabel id="circuits-label">Circuiti</InputLabel>
						<Select
							size="small"
							labelId="multiple-checkbox-label-first"
							id="multiple-checkbox-first-card"
							name="multiple-checkbox-first-card"
							multiple
							value={firstCardCircuits}
							onChange={(e) => handleChangeMultiSelectCard(e, setFirstCardCircuits)}
							label="Circuiti"
							renderValue={(selected) => selected.join(", ")}
							defaultValue={firstCardCircuits}
							onOpen={() => setOpenFirstCard(true)}
							onClose={() => setOpenFirstCard(false)}
							open={openFirstCard}
						>
							{multiSelectMenuItems()}
						</Select>
					</FormControl>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<TextField
						fullWidth
						id="iban1"
						name="iban1"
						label={"IBAN"}
						placeholder={"IBAN"}
						size="small"
						onChange={handleChange}
						// error={Boolean(errors.iban1)}
						// helperText={errors.iban1}
						// inputProps={{ maxLength: ACQUIRER_ID_LENGTH }}
						defaultValue={firstIban.IBAN}
					/>
				</Grid>
				<Grid xs={4} item my={1} px={1}>
					<TextField
						fullWidth
						id="banca-iban1"
						name="banca-iban1"
						label={"Banca IBAN"}
						placeholder={"es: ISYBANK"}
						size="small"
						onChange={handleChange}
						// error={Boolean(errors.iban1)}
						// helperText={errors.iban1}
						// inputProps={{ maxLength: ACQUIRER_ID_LENGTH }}
						defaultValue={firstIban.IBAN}
					/>
				</Grid>

				<Grid container item xs={12} ml={1} my={2} display={"flex"} justifyContent={"flex-start"}>
					<Button id="visible-section-btn" variant="text" onClick={setVisible}>{
						optionalPaymentMethod ? "Rimuovi metodi di pagamento" : "Aggiungi metodi di pagamento"
					}</Button>
				</Grid>

				{
					optionalPaymentMethod && (
						<>
							<Grid xs={4} item my={1} px={1}>
								<TextField
									fullWidth
									id="pan2"
									name="pan2"
									label={"PAN"}
									placeholder={"1234567891234567"}
									size="small"
									onChange={handleChange}
									error={Boolean(errors.pan1)}
									helperText={errors.pan1}
									inputProps={{ maxLength: PAN_MAX_LENGHT }}
									defaultValue={panInfoSecondCard.pan}
								/>
							</Grid>
							<Grid xs={4} item my={1} px={1}>
								<TextField
									fullWidth
									id="bankPan2"
									name="bankPan2"
									label={"Banca PAN"}
									placeholder={"es: ISYBANK"}
									size="small"
									onChange={handleChange}
									error={Boolean(errors.pan1)}
									helperText={errors.pan1}
									defaultValue={panInfoSecondCard.pan}
								/>
							</Grid>
							<Grid xs={4} item my={1} px={1}>
								<FormControl focused={openSecondCard} fullWidth>
									<InputLabel id="circuits-label">Circuiti</InputLabel>
									<Select
										size="small"
										labelId="multiple-checkbox-label-first"
										id="multiple-checkbox-first-card"
										name="multiple-checkbox-first-card"
										multiple
										value={secondCardCircuits}
										onChange={(e) => handleChangeMultiSelectCard(e, setSecondCardCircuits)}
										label="Circuiti"
										renderValue={(selected) => selected.join(", ")}
										defaultValue={secondCardCircuits}
										onOpen={() => setOpenSecondCard(true)}
										onClose={() => setOpenSecondCard(false)}	
										open={openSecondCard}
									>
										{multiSelectMenuItems()}
									</Select>
								</FormControl>
							</Grid>
							<Grid xs={4} item my={1} px={1}>
								<TextField
									fullWidth
									id="iban2"
									name="iban2"
									label={"IBAN"}
									placeholder={"IBAN"}
									size="small"
									onChange={handleChange}
									// error={Boolean(errors.iban1)}
									// helperText={errors.iban1}
									// inputProps={{ maxLength: ACQUIRER_ID_LENGTH }}
									defaultValue={secondIban.IBAN}
								/>
							</Grid>
							<Grid xs={4} item my={1} px={1}>
								<TextField
									fullWidth
									id="banca-iban2"
									name="banca-iban2"
									label={"Banca IBAN"}
									placeholder={"es: ISYBANK"}
									size="small"
									onChange={handleChange}
									// error={Boolean(errors.iban1)}
									// helperText={errors.iban1}
									// inputProps={{ maxLength: ACQUIRER_ID_LENGTH }}
									defaultValue={secondIban.bankName}
								/>
							</Grid>
						</>
					)
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
