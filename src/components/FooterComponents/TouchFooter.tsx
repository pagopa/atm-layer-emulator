import { Button, Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { theme } from "@pagopa/mui-italia";

type Props = {
    backButton: () => void;
};

export const TouchFooter = ({ backButton }: Props) => {
	const borderButtons = { width: theme.spacing(20) };

	return (
		<Grid container ml={theme.spacing(3)}>
			<Grid item xs={3} sx={{ textAlign: "start" }}>
				<Button
					color="primary"
					size="medium"
					startIcon={<ArrowBackIcon />}
					variant="outlined"
					sx={borderButtons}
					onClick={backButton}
				>
                    Indietro
				</Button>
			</Grid>
			<Grid item xs={2} sx={{ textAlign: "start" }}>
				<Button
					color="error"
					size="medium"
					startIcon={<LogoutIcon />}
					variant="outlined"
					sx={borderButtons}
					onClick={() => console.log("Bottone ")}
				>
                    Esci
				</Button>
			</Grid>
		</Grid>
	);
};