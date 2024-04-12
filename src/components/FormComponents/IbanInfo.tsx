import React from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { IbanDto, IbanListDto } from "../model/ParametersModel";
import { IBAN_MAX_LENGTH } from "../../commons/constants";

type Props = {
	iban: IbanDto;
	index: number;
	ibanListErrors: any;
	handleChangeIbanList: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
	formDataIbanList: IbanListDto;
	optionalPaymentMethodIbanManagment: () => void;
};

const IbanInfoCard = ({
	iban,
	index,
	ibanListErrors,
	handleChangeIbanList,
	formDataIbanList,
	optionalPaymentMethodIbanManagment
}: Props) => (
	<React.Fragment key={`ibanFragmnet${index}`}>
		{index === 0 && (
			<Grid item xs={12} ml={1} my={1} display={"flex"} justifyContent={"center"} key={`grid${index}`}>
				<Typography variant="body1" fontWeight="600">
					{index === 0 ? "Inserire i dati dell'Iban principali" : "Indrire i dati dell'Iban opzionali"}
				</Typography>
			</Grid>
		)}
		<Grid xs={4} item my={1} px={1}>
			<TextField
				required
				key={`iban${index}`}
				fullWidth
				id="IBAN"
				name="IBAN"
				label={"IBAN"}
				placeholder={"IBAN"}
				size="small"
				value={iban?.IBAN}
				onChange={(e) => handleChangeIbanList(e, index)}
				inputProps={{ maxLength: IBAN_MAX_LENGTH, "data-testid":"iban-test" }}
				error={Boolean(ibanListErrors[index].IBAN)}
				helperText={ibanListErrors[index]?.IBAN}
			/>
		</Grid>
		<Grid xs={4} item my={1} px={1}>
			<TextField
				required
				key={`bankName${index}`}
				fullWidth
				id="banca-iban"
				name="bankName"
				label={"Banca IBAN"}
				placeholder={"es: ISYBANK"}
				size="small"
				value={iban?.bankName}
				onChange={(e) => handleChangeIbanList(e, index)}
				error={Boolean(ibanListErrors[index].bankName)}
				helperText={ibanListErrors[index]?.bankName}
			/>
		</Grid>

		{index === 0 && (<Grid container item xs={12} ml={1} my={1} display={"flex"} justifyContent={"flex-start"} key={`buttonIban${index}`}>
			<Button size={"small"} id="visible-section-btn" variant="text" onClick={() => {
				optionalPaymentMethodIbanManagment();
			}}>
				{
					formDataIbanList.IBANlist.length === 1 ? "Aggiungi metodo di pagamento Iban" : "Rimuovi metodo di pagamento Iban"
				}
			</Button>
		</Grid>)
		}
	</React.Fragment>
);

export default IbanInfoCard;
