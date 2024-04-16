import { Button, Grid, Typography } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
    content: string;
    handleAdd: any;
    handleRemove: any;
    next: (params: any) => Promise<void>;
};

const KeyPadButton = ( {content, handleAdd, handleRemove,  next} : Props) => {
	switch (content) {
	case "Canc":
		return (
			<Button variant="contained" sx={{ backgroundColor: "#dddddd", border: "2px solid black", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => next({ continue: false })}>
				<Grid container item padding={"8px"} display={"flex"} flexDirection={"row"}>
					<Grid item xs={12} display={"flex"} justifyContent={"flex-start"}>
						<Typography color={"black"} fontSize={"16px"} sx={{ pt: 2 }}>Canc</Typography>
					</Grid>
					<Grid item xs={12} display={"flex"} justifyContent={"center"}>
						<DisabledByDefaultIcon color="error" sx={{ pb: 2 }} />
					</Grid>
				</Grid>
			</Button>
		);
	case "Enter":
		return (
			<Button variant="contained" sx={{ backgroundColor: "#dddddd", border: "2px solid black", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => next({ continue: true })}>
				<Grid container item padding={"8px"} display={"flex"} flexDirection={"row"}>
					<Grid item xs={12} display={"flex"} justifyContent={"flex-start"}>
						<Typography color={"black"} fontSize={"16px"} sx={{ pt: 2 }}>Enter</Typography>
					</Grid>
					<Grid item xs={12} display={"flex"} justifyContent={"center"}>
						<CheckIcon color="success" sx={{ pb: 2 }} />
					</Grid>
				</Grid>
			</Button>
		);
	case "Clear":
		return (
			<Button variant="contained" sx={{ backgroundColor: "#dddddd", border: "2px solid black", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleRemove()}>
				<Grid container item padding={"8px"} display={"flex"} flexDirection={"row"}>
					<Grid item xs={12} display={"flex"} justifyContent={"flex-start"}>
						<Typography color={"black"} fontSize={"16px"} sx={{ pt: 2 }}>Clear</Typography>
					</Grid>
					<Grid item xs={12} display={"flex"} justifyContent={"center"}>
						<BackspaceIcon color="warning" sx={{ pb: 2 }} />
					</Grid>
				</Grid>
			</Button>
		);
	case "":
		return (
			<Grid item xs={3}>
				<Typography>

				</Typography>
			</Grid>
		);
	default:
		return (
			<Button variant="contained" sx={{ backgroundColor: "#dddddd", border: "2px solid black", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAdd(content)}>
				<Grid container padding={"8px"}>
					<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
						<Typography color={"black"} fontSize={"25px"} fontWeight={"bold"}>{content}</Typography>
					</Grid>
				</Grid>
			</Button>
		);
	};
};

export default KeyPadButton;