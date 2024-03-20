import React, { useContext, useEffect, useState } from "react";
import { FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { ParametersDto } from "../model/ParametersModel";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { resetErrors } from "../Commons/Commons";
import { TASK_MAIN } from "../../commons/endpoints";
import { ACQUIRER_ID_LENGTH, CODE_LEGTH, FISCAL_CODE_LENGTH, TERMINAL_BRANCH_LENGTH } from "../../commons/constants";
import checks from "../../utils/checks";
import ROUTES from "../../routes";
import FormTemplate from "./template/FormTemplate";



export const FormEmulatorParameters = () => {

	const [loadingButton, setLoadingButton] = useState(false);
	const { cfIsValid } = checks();

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
	const { abortController, setResponseProcess,setTransactionData, touchInterface, setTouchInterface, debugOn } = useContext(Ctx);
	const navigate = useNavigate();

	useEffect(() => {
		validateForm();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const target = e.target as HTMLInputElement;
		const { name, value, checked } = target;
		resetErrors(errors, setErrors, name);
		
		if (name === "printer" || name === "scanner" || name==="touch") {
			setFormData((prevFormData: any) => ({ ...prevFormData, [name]: checked ? "OK" : "KO" }));

			if (name === "touch") {
				setTouchInterface(checked);
			}
		}else{
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
			fiscalCode: formData.fiscalCode ? cfIsValid(formData.fiscalCode) ? "" : "Codice fiscale non valido" : "Campo obbligatorio",
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
					continue: true
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
			try {
				const response = await fetchRequest({ urlEndpoint: TASK_MAIN, method: "POST", abortController, body: postData, headers: { "Content-Type": "application/json" } })();
				setLoadingButton(false);

				if (response?.success) {
					setResponseProcess(response?.valuesObj);
					setTransactionData(formData);
					navigate(ROUTES.SERVICE_ACCESS);
				}
			} catch (error) {
				setLoadingButton(false);
				console.log("Response negative: ", error);
			};
		};
	};

	const handleSubmitTest = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			const date = new Date().toISOString().slice(0, -5);
			const postData = {
				data: {
					continue: true
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
			try {
				const response = await fetchRequest({ urlEndpoint: TASK_MAIN, method: "POST", abortController, body: postData, headers: { "Content-Type": "application/json" } })();
				setLoadingButton(false);

				if (response?.success) {
					setResponseProcess(response?.valuesObj);
					setTransactionData(formData);
					navigate(ROUTES.TEST);
				}
			} catch (error) {
				setLoadingButton(false);
				console.log("Response negative: ", error);
			};
		};
	};


	return (
		<FormTemplate
			handleSubmit={handleSubmit}
			loadingButton={loadingButton}
			handleSubmitTest={handleSubmitTest}
		>
			<Grid xs={12} item my={1}>
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
			<Grid xs={12} item my={1}>
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
			<Grid xs={12} item my={1}>
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
			<Grid xs={12} item my={1}>
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
			<Grid xs={12} item my={1}>
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
			<Grid xs={12} md={4} item my={1} >
				<FormControlLabel
					id="printer"
					value="OK"
					control={
						<Switch
							checked={formData?.printer==="OK"?true:false}
							onChange={handleChange}
							name="printer"
						/>
					}
					label={
						<Typography>
							Stampante
						</Typography>
					}
					labelPlacement="start"
				/>
			</Grid>
			<Grid xs={12} md={4} item my={1} >
				<FormControlLabel
					id="scanner"
					value="OK"
					control={
						<Switch
							checked={formData?.scanner==="OK"?true:false}
							onChange={handleChange}
							name="scanner"
						/>
					}
					label={
						<Typography>
							Scanner
						</Typography>
					}
					labelPlacement="start"
				/>
			</Grid>
			<Grid xs={12} sm={4} item my={1} >
				<FormControlLabel
					id="touch"
					value="touch"
					control={
						<Switch
							checked={touchInterface}
							onChange={handleChange}
							name="touch"
						/>
					}
					label={
						<Typography>
							ATM Touch
						</Typography>
					}
					labelPlacement="start"
				/>
			</Grid>
		</FormTemplate>
	);
};

export default FormEmulatorParameters;