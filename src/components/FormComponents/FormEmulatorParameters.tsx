/* eslint-disable indent */
import React, { ReactElement, useContext, useState } from "react";
import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { Ctx } from "../../DataContext";
import { ParametersDto } from "../model/ParametersModel";
import FormTemplate from "./template/FormTemplate";


export const FormEmulatorParameters = (props: any): ReactElement | null => {

    const [loadingButton, setLoadingButton] = useState(false);

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
    const { abortController } = useContext(Ctx);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<"success" | "error">("success");
    const [printerChecked, setPrinterChecked] = useState(true);
    const [scannerChecked, setScannerChecked] = useState(true);
    const [title, setTitle] = useState("");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // resetErrors(errors, setErrors, e.target.name);
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {
            acquirerId: formData.acquirerId ? "" : "Campo obbligatorio",
            branchId: formData.branchId ? "" : "Campo obbligatorio",
            code: formData.code ? "" : "Campo obbligatorio",
            terminalId: formData.terminalId ? "" : "Campo obbligatorio",
            fiscalCode: formData.fiscalCode ? "" : "Campo obbligatorio",
        };

        setErrors(newErrors);

        // Determines whether all the members of the array satisfy the conditions "!error".
        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            const postData = new FormData();
            if (formData.acquirerId && formData.branchId && formData.code && formData.terminalId && formData.fiscalCode) {
                postData.append("bankId", formData.acquirerId);
                postData.append("branchId", formData.branchId);
                postData.append("code", formData.code);
                postData.append("terminalId", formData.terminalId);
                postData.append("fiscalCode", formData.fiscalCode);
                postData.append("PRINTER", formData.printer);
                postData.append("SCANNER", formData.scanner);
            }
            setLoadingButton(true);
            // 	try {
            // 		const response = await fetchRequest({ urlEndpoint: CREATE_BPMN_API, method: "POST", abortController, body: postData, isFormData: true })();
            // 		setLoadingButton(false);
            // 		handleSnackbar(response?.success, setMessage, setSeverity, setTitle, setOpenSnackBar, response?.valuesObj?.message);

            // 	} catch (error) {
            // 		setLoadingButton(false);
            // 		console.log("Response negative: ", error);
            // 		handleSnackbar(false, setMessage, setSeverity, setTitle, setOpenSnackBar);
            // 	}
            // }

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
                    onChange={handleChange}
                    error={Boolean(errors.acquirerId)}
                    helperText={errors.acquirerId}
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
                    onChange={handleChange}
                    error={Boolean(errors.branchId)}
                    helperText={errors.branchId}
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
                    onChange={handleChange}
                    error={Boolean(errors.code)}
                    helperText={errors.code}
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
                    onChange={handleChange}
                    error={Boolean(errors.terminalId)}
                    helperText={errors.terminalId}
                />
            </Grid>
            <Grid xs={12} item my={1}>
                <TextField
                    fullWidth
                    id="fiscalCode"
                    name="fiscalCode"
                    label={"Codice Fiscale"}
                    placeholder={"ABCDEFG12H34I567J"}
                    size="small"
                    value={formData.fiscalCode}
                    onChange={handleChange}
                    error={Boolean(errors.fiscalCode)}
                    helperText={errors.fiscalCode}
                />
            </Grid>
            <Grid xs={6} item my={1}>
                <FormControlLabel
                    id="printer"
                    value="OK"
                    control={<Switch
                        checked={printerChecked}
                        onChange={() => {
                            setPrinterChecked(!printerChecked);
                            setFormData({ ...formData, printer: "KO" });
                        }}
                        name="printerSwitch"
                    />}
                    label="Stampante"
                    labelPlacement="start"
                />

            </Grid>
            <Grid xs={6} item my={1}>
                <FormControlLabel
                    id="scanner"
                    value="OK"
                    control={<Switch
                        checked={scannerChecked}
                        onChange={() => {
                            setScannerChecked(!scannerChecked);
                            setFormData({ ...formData, scanner: "KO" });
                        }}
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