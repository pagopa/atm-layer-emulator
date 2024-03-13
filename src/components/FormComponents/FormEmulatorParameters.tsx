import React, { useContext, useState } from "react";
import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { ParametersDto } from "../model/ParametersModel";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { handleSnackbar, resetErrors } from "../Commons/Commons";
import { TASK_MAIN } from "../../commons/endpoints";
import { ACQUIRER_ID_LENGTH, CODE_LEGTH, FISCAL_CODE_LENGTH, TERMINAL_BRANCH_LENGTH } from "../../commons/constants";
import checks from "../../utils/checks";
// import fetchAuth from "../../hook/fetchAuth";
import { base64_decode } from "../../commons/decode";
import ROUTES from "../../routes";
import FormTemplate from "./template/FormTemplate";


export const FormEmulatorParameters = () => {

	const [loadingButton, setLoadingButton] = useState(false);
	const { isValidFiscalCode } = checks();

	const initialValues: ParametersDto = {
		acquirerId: "",
		branchId: "",
		code: "",
		terminalId: "",
		fiscalCode: "",
		printer: "OK",
		scanner: "OK",
	};

	const [formData, setFormData] = useState(initialValues);
	const [errors, setErrors] = useState<any>(initialValues);
	const { abortController, setTemplate } = useContext(Ctx);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [printerChecked, setPrinterChecked] = useState(true);
	const [scannerChecked, setScannerChecked] = useState(true);
	const [title, setTitle] = useState("");
	const token = localStorage.getItem("jwt_emulator") ?? "";
	const navigate = useNavigate();

	const handleChange = (fieldName?: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if(fieldName){
			const target = e.target as HTMLInputElement;
			const isChecked = target.checked;
			if (fieldName === "printer") {
				setPrinterChecked(isChecked);
			} else if (fieldName === "scanner") {
				setScannerChecked(isChecked);
			}
			const newValue = isChecked ? "OK" : "KO";
			setFormData({ ...formData, [fieldName]: newValue });
		} else {
			const { name, value } = e.target;
			resetErrors(errors, setErrors, e.target.name);
			setFormData((prevFormData: any) => ({
				...prevFormData,
				[name]: value
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {
			acquirerId: formData.acquirerId ? "" : "Campo obbligatorio",
			branchId: formData.branchId ? "" : "Campo obbligatorio",
			code: formData.code ? "" : "Campo obbligatorio",
			terminalId: formData.terminalId ? "" : "Campo obbligatorio",
			fiscalCode: formData.fiscalCode ? isValidFiscalCode(formData.fiscalCode) ? "" : "Codice fiscale non valido" : "Campo obbligatorio",
		};

		setErrors(newErrors);

		// Determines whether all the members of the array satisfy the conditions "!error".
		return Object.values(newErrors).every((error) => !error);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const postData = {
				data: {
					continue: true
				},
				device: {
					bankId: formData.acquirerId,
					branchId: formData.branchId,
					channel: "ATM",
					code: formData.code,
					opTimestamp: "2023-10-31T16:30:00",
					peripherals: [
						{
							id: "PRINTER",
							name: "Receipt printer",
							status: formData.printer
						},
						{
							id: "SCANNER",
							name: "Scanner",
							status: formData.scanner
						}
					],
					terminalId: formData.terminalId,
				},
				fiscalCode: formData.fiscalCode,
			};

			setLoadingButton(true);
			const customHeaders = {
				"Content-Type": "application/json",
				"Authorization": token
			};

			try {
				const response = await fetchRequest({ urlEndpoint: TASK_MAIN, method: "POST", abortController, body: postData, headers: customHeaders })();
				setLoadingButton(false);
				handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);

				if (response?.success) {
					const element = base64_decode(response?.valuesObj?.task?.template?.content);
					setTemplate(element);
					console.log("RESPONSE DECODED: ", element);
					navigate(ROUTES.SERVICE_ACCESS);
				}
			} catch (error) {
				setLoadingButton(false);
				console.log("Response negative: ", error);
				handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
			};
		};


	};


	return (
		<FormTemplate
			setOpenSnackBar={setOpenSnackBar}
			handleSubmit={handleSubmit}
			openSnackBar={openSnackBar}
			severity={severity}
			message={message}
			title={title}
			loadingButton={loadingButton}
		>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="acquirerId"
					name="acquirerId"
					label={"ID Banca"}
					placeholder={"06789"}
					size="small"
					value={formData.acquirerId}
					onChange={handleChange()}
					error={Boolean(errors.acquirerId)}
					helperText={errors.acquirerId}
					inputProps={{ maxLength: ACQUIRER_ID_LENGTH }}
				/>
			</Grid>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="branchId"
					name="branchId"
					label={"ID Filiale"}
					placeholder={"12345"}
					size="small"
					value={formData.branchId}
					onChange={handleChange()}
					error={Boolean(errors.branchId)}
					helperText={errors.branchId}
					inputProps={{ maxLength: TERMINAL_BRANCH_LENGTH }}
				/>
			</Grid>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="code"
					name="code"
					label={"Codice"}
					placeholder={"0001"}
					size="small"
					value={formData.code}
					onChange={handleChange()}
					error={Boolean(errors.code)}
					helperText={errors.code}
					inputProps={{ maxLength: CODE_LEGTH }}
				/>
			</Grid>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="terminalId"
					name="terminalId"
					label={"ID Terminale"}
					placeholder={"64874412"}
					size="small"
					value={formData.terminalId}
					onChange={handleChange()}
					error={Boolean(errors.terminalId)}
					helperText={errors.terminalId}
					inputProps={{ maxLength: TERMINAL_BRANCH_LENGTH }}
				/>
			</Grid>
			<Grid xs={12} item my={1}>
				<TextField
					fullWidth
					id="fiscalCode"
					name="fiscalCode"
					label={"Codice Fiscale"}
					placeholder={"RSSMRA74D22A001Q"}
					size="small"
					value={formData.fiscalCode}
					onChange={handleChange()}
					error={Boolean(errors.fiscalCode)}
					helperText={errors.fiscalCode}
					inputProps={{ maxLength: FISCAL_CODE_LENGTH }}
				/>
			</Grid>
			<Grid xs={6} item my={1} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
				<FormControlLabel
					id="printer"
					value="OK"
					control={<Switch
						checked={printerChecked}
						onChange={handleChange("printer")}
						name="printerSwitch"
					/>}
					label="Stampante"
					labelPlacement="start"
				/>

			</Grid>
			<Grid xs={6} item my={1} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
				<FormControlLabel
					id="scanner"
					value="OK"
					control={<Switch
						checked={scannerChecked}
						onChange={handleChange("scanner")}
						name="scannerSwitch"
					/>}
					label="Scanner"
					labelPlacement="start"
				/>
			</Grid>
		</FormTemplate>
	);
};

export default FormEmulatorParameters;