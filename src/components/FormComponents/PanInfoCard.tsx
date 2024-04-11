import React from "react";
import {
	FormControl,
	FormHelperText,
	Grid,
	OutlinedInput,
	Select,
	Typography,
	Button,
	TextField,
	InputLabel,
	SelectChangeEvent,
} from "@mui/material";
import { PAN_MAX_LENGTH } from "../../commons/constants";
import { PanDto, PanInfoDto } from "../model/ParametersModel";

type Props = {
	card: PanDto;
	index: number;
	panInfoErrors: any;
	multiSelectMenuItems: any;
	openFirstCard: boolean;
	openSecondCard: boolean;
	setOpenFirstCard: (value: React.SetStateAction<boolean>) => void;
	setOpenSecondCard: (value: React.SetStateAction<boolean>) => void;
	handleChangePanInfoCards: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
	handleChangeMultiSelectCard: (event: SelectChangeEvent<Array<string>>, cardIndex: number) => void;
	formDataPanInfoCards: PanInfoDto;
	optionalPaymentMethodPanManagment: () => void;
};

const PanInfoCard = ({
	card,
	index,
	panInfoErrors,
	multiSelectMenuItems,
	openFirstCard,
	openSecondCard,
	setOpenFirstCard,
	setOpenSecondCard,
	handleChangePanInfoCards,
	handleChangeMultiSelectCard,
	formDataPanInfoCards,
	optionalPaymentMethodPanManagment
}: Props) => (
	<React.Fragment>
		{index === 0 && (
			<Grid item xs={12} ml={1} my={1} display={"flex"} justifyContent={"center"} key={`grid${index}`}>
				<Typography variant="body1" fontWeight="600">
					{index === 0 ? "Inserire i dati del pan principali" : "Indrire i dati del pan opzionali"}
				</Typography>
			</Grid>
		)}
		<Grid xs={4} item my={1} px={1}>
			<TextField
				required
				key={`pan${index}`}
				fullWidth
				id="pan"
				name={"pan"}
				label={"PAN"}
				placeholder={"1234567891234567"}
				size="small"
				value={card?.pan}
				onChange={(e) => handleChangePanInfoCards(e, index)}
				inputProps={{ maxLength: PAN_MAX_LENGTH }}
				error={Boolean(panInfoErrors[index].pan)}
				helperText={panInfoErrors[index].pan}
			/>
		</Grid>
		<Grid xs={4} item my={1} px={1}>
			<TextField
				required
				key={`bankPan${index}`}
				fullWidth
				id="bankPan"
				name="bankName"
				label={"Banca PAN"}
				placeholder={"ISYBANK"}
				size="small"
				value={card?.bankName}
				onChange={(e) => handleChangePanInfoCards(e, index)}
				error={Boolean(panInfoErrors[index].bankName)}
				helperText={panInfoErrors[index].bankName}
			/>
		</Grid>
		<Grid xs={4} item my={1} px={1}>
			<FormControl focused={index === 0 ? openFirstCard : openSecondCard} error={Boolean(panInfoErrors[index].circuits)} fullWidth>
				<InputLabel id="circuits-label">Circuiti</InputLabel>
				<Select
					required
					size="small"
					labelId="circuits-label"
					id="multiple-checkbox-card"
					name="multiple-checkbox-card"
					multiple
					value={card?.circuits ?? []}
					onChange={(e) => handleChangeMultiSelectCard(e, index)}
					input={<OutlinedInput label="Name" />}
					renderValue={(selected) => selected.join(", ")}
					onOpen={() => index === 0 ? setOpenFirstCard(true) : setOpenSecondCard(true)}
					onClose={() => index === 0 ? setOpenFirstCard(false) : setOpenSecondCard(false)}
					open={index === 0 ? openFirstCard : openSecondCard}
					data-testid={`circuits-select-${index}`}
				>
					{multiSelectMenuItems()}
				</Select>
				<FormHelperText>{panInfoErrors[index].circuits}</FormHelperText>
			</FormControl>
		</Grid>

		{index === 0 && (
			<Grid container item xs={12} ml={1} my={1} display={"flex"} justifyContent={"flex-start"} key={`button${index}`}>
				<Grid item xs={6}>
					<Button size={"small"} id="visible-section-btn" data-testid="visible-section-btn-test" variant="text" onClick={() => {
						optionalPaymentMethodPanManagment();
					}}>
						{
							formDataPanInfoCards.panInfo.length === 1 ? "Aggiungi metodo di pagamento pan" : "Rimuovi metodo di pagamento pan"
						}
					</Button>
				</Grid>
			</Grid>)
		}


	</React.Fragment>
);

export default PanInfoCard;
