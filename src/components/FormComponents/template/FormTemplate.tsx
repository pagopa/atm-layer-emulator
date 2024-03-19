import React, { useContext } from "react";
import { Grid, Typography, Box, useTheme, Button, useMediaQuery } from "@mui/material";
import { TitleComponent } from "../../TitleComponents/TitleComponent";
import { Loading } from "../../Commons/Loading";
import { Ctx } from "../../../DataContext";

type Props = {
	handleSubmit: (e: React.FormEvent) => void;
	children?: any;
	handleSwitchAssociationFetch?: () => Promise<void>;
	loadingButton?: boolean;
	handleSubmitTest?: (e: React.FormEvent) => void;
};

export default function FormTemplate({ handleSubmit, children, loadingButton }: Readonly<Props>) {
	const theme = useTheme();
	const isXl = useMediaQuery(theme.breakpoints.only("xl"));

	const inputGroupStyle = {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: theme.palette.divider,
	};
	const {debugOn } = useContext(Ctx);


	// const disabledConfirmButton = () => openSnackBar ? true : false;
	console.log(window.innerWidth>theme.breakpoints.values.md);
	return (
		<Box sx={{ maxWidth: isXl ? "50%" : "100%" }}>
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
					{debugOn&& 
						<Button variant="outlined" onClick={handleSubmit} color="error" sx={{marginRight:5}}>
											Test
						</Button>
					}
					<Button variant="contained" onClick={handleSubmit} /* disabled={disabledConfirmButton()} */>
						{loadingButton ? <Loading size={20} thickness={5} marginTop={"0px"} color={"white"} /> : "Conferma"}
					</Button>

				</Box>
			</Box>
		</Box>
	);
}
