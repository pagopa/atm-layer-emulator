import React, { useContext } from "react";
import { Grid, Typography, Box, useTheme, Button } from "@mui/material";
import { Loading } from "../../../utils/Commons/Loading";
import { Ctx } from "../../../DataContext";

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
	const {debugOn } = useContext(Ctx);


	// const disabledConfirmButton = () => openSnackBar ? true : false;
	// console.log(window.innerWidth>theme.breakpoints.values.md);
	return (
		<Box sx={{ maxWidth: window.innerWidth > theme.breakpoints.values.md ? "75%" : "100%" }}>
			<Box p={3} my={2} mx={"auto"} sx={inputGroupStyle}  >
				<Grid container >
					

					{children}
				</Grid>
				<Box display="flex" justifyContent="flex-end" mt={2}>
					<Button variant="contained" onClick={handleSubmit} id="confirm-button" style={{ minWidth: "115px" }} >
						{loadingButton ? <Loading size={20} thickness={5} marginTop={"0px"} color={"white"} /> : "Conferma"}
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
