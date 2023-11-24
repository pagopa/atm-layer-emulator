import {Box, CircularProgress, Grid, Typography } from "@mui/material";
import { theme } from "@pagopa/mui-italia";
import { Header } from "../../components/Header";
import { getCompletePathImage } from "../../utils/Commons";

export const LoadingPage = () => (
	<>
		<Header 
			bankTitle="Test" 
			bankLogo={getCompletePathImage("icon-48x48.png")} 
			serviceDescription="Servizi di pubblica utilità" 
		/>
		<Box 
			height="90vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Grid container textAlign={"center"} rowGap={theme.spacing(3)}>
				<Grid item xs={12}>
					<CircularProgress
						size="48px"
						thickness={4}
						sx={{
							"& .MuiCircularProgress-circle": {
								stroke: "#0B3EE3", // Color for the progress circle
								strokeDasharray: "238.76% 150%", // Set a custom strokeDasharray for 3/4 progress
							},
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography fontSize={theme.typography.pxToRem(17.5)}>
                Stiamo verificando i dati dell’avviso
					</Typography>
				</Grid>
			</Grid>
		</Box>
		
	</>
);
