import { Grid, Typography, Box, useTheme, Button } from "@mui/material";
import React, { SetStateAction } from "react";
import { TitleComponent } from "../../TitleComponents/TitleComponent";
import { Loading } from "../../Commons/Loading";

type Props = {
	handleSubmit: (e: React.FormEvent) => void;
	children?: any;
	handleSwitchAssociationFetch?: () => Promise<void>;
	loadingButton?: boolean;
};

export default function FormTemplate({ handleSubmit, children, loadingButton }: Readonly<Props>) {
	const theme = useTheme();

	const inputGroupStyle = {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: theme.palette.divider,
	};

	// const disabledConfirmButton = () => openSnackBar ? true : false;

	return (
		<Box sx={{ maxWidth: "50%" }}>
			<Box p={3} my={3} mx={"auto"} sx={inputGroupStyle}  >
				<Grid container >
					<Grid item xs={12}>
						<Box display="flex" mb={2}>
							<Typography variant="body1" fontWeight="600">
								{"Compilare tutti i campi per iniziare la simulazione"}
							</Typography>
						</Box>
					</Grid>

					{children}
				</Grid>
				<Box display="flex" justifyContent="flex-end" mt={2}>

					<Button variant="contained" onClick={handleSubmit} /* disabled={disabledConfirmButton()} */>
						{loadingButton ? <Loading size={20} thickness={5} marginTop={"0px"} color={"white"} /> : "Conferma"}
					</Button>

				</Box>
			</Box>
		</Box>
	);
}
