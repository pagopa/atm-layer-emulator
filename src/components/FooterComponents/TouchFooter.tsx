import { Box, Button, Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { theme } from "@pagopa/mui-italia";

type Props = {
    backButton: () => void;
	continueButton?: string; 
};

export const TouchFooter = ({ backButton, continueButton }: Props) => (
	<Grid
		container
		ml={theme.spacing(3)}
		gap={theme.spacing(3)}
	>
		<Grid item xs={3} textAlign="start">
			<Button
				color="primary"
				size="medium"
				startIcon={<ArrowBackIcon />}
				variant="outlined"
				fullWidth
				onClick={backButton}
			>
                    Indietro
			</Button>
		</Grid>
		<Grid item xs={2} textAlign="start">
			<Button
				color="error"
				size="medium"
				startIcon={<LogoutIcon />}
				variant="outlined"
				fullWidth
				onClick={() => console.log("Bottone")}
			>
                    Esci
			</Button>
		</Grid>
			 {
			continueButton && (
				<Grid item xs={6} textAlign="end">
					<Button
						color="primary"
						size="medium"
						variant="contained"
						sx={{width: theme.spacing(20)}}
						onClick={() => console.log("Bottone")}
					>
						{continueButton}
					</Button>
				</Grid>
			)
		}
	</Grid>
);