import { Grid } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
    buttonContent:string;
};

const getKeyPadButtonIcon = ({buttonContent} : Props) => {
	switch (buttonContent){
	case "Canc":
		return (
			<Grid item xs={12} display={"flex"} justifyContent={"center"}>
				<DisabledByDefaultIcon color="error" sx={{ pb: 2 }} />
			</Grid>
		);
	case "Enter":
		return (
			<Grid item xs={12} display={"flex"} justifyContent={"center"}>
				<CheckIcon color="success" sx={{ pb: 2 }} />
			</Grid>
		);
	case "Clear":
		return (
			<Grid item xs={12} display={"flex"} justifyContent={"center"}>
				<BackspaceIcon color="warning" sx={{ pb: 2 }} />
			</Grid>
		);
	default:
		return (
			<></>
		);
	};

};

export default getKeyPadButtonIcon;