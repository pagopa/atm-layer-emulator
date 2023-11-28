import {Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { theme } from "@pagopa/mui-italia";
import { Header } from "../../components/Header";
import { getCompletePathImage } from "../../utils/Commons";
import { Footer } from "../../components/Footer";
import { CardLayout } from "../../components/CardComponents/CardLayout";
import { ManualLayout } from "../../components/ManualComponents/ManualLayout";
import { useCtx } from "../../DataContext";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";

export const HomePage = () => {

	const { interfaceType, setInterfaceType } = useCtx(); 
	useEffect(() => setInterfaceType(true), []);
	const backButton = () => console.log("Bottone");
            
	return (
		<>
			<Header 
				bankTitle="Test" 
				bankLogo={getCompletePathImage("icon-48x48.png")} 
				serviceDescription="Servizi di pubblica utilità" 
			/>
			<Box marginTop={theme.spacing(3)} marginLeft={theme.spacing(3)} textAlign={"start"}>
				<TitleComponent 
					title={"A quale servizio vuoi accedere?"} 
					subTitle={"Puoi effettuare pagamenti verso la PA e gestire le tue iniziative di welfare."}
				/>
			</Box>
			<Box 
				className="App" 
				minHeight="56.5vmin"
				justifyContent={"center"}
				ml={3} 
			>
				{interfaceType ?  <CardLayout /> : <ManualLayout />}
			</Box>
			<Footer backButton={backButton} />
		</>
	);	
};
