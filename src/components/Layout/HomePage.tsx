import {Box, Typography, useTheme } from "@mui/material";
import { Header } from "../Header";
import { getCompletePathImage } from "../../utils/Commons";
import { Footer } from "../Footer";
import { CardLayout } from "../CardComponents/CardLayout";

export const HomePage = () => {
	
	const theme = useTheme();

	return (
		<>
			<Header 
				bankTitle="Test" 
				bankLogo={getCompletePathImage("icon-48x48.png")} 
				serviceDescription="Servizi di pubblica utilità" 
			/>
			<Box 
				className="App" 
				height="100vh"
				mt={3}
				ml={3}
			>
				<Box>
					<Typography  variant="h5" textAlign={"start"}> A quale servizio vuoi accedere? </Typography>
					<Typography 
						mt={1}
						variant="subtitle2" 
						noWrap 
						fontWeight={theme.typography.body2.fontWeight} 
						color={"text.secondary"} 
						textAlign={"start"}
				 > 
				 	Puoi effettuare pagamenti verso la PA e gestire le tue iniziative di welfare. 
				 </Typography>
				</Box>
				<Box marginTop={9}>
					<CardLayout />
				</Box>
			</Box>
			<Footer />
		</>
	);	
};
