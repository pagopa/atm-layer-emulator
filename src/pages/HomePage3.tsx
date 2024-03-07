import {Box, useTheme } from "@mui/material";
import { useContext } from "react";
import { Header } from "../components/Header";
import { getCompletePathImage } from "../utils/Commons";
import { Footer } from "../components/Footer";
import { CardLayout } from "../components/CardComponents/CardLayout";
import { ManualLayout } from "../components/ManualComponents/ManualLayout";
import { TitleComponent } from "../components/TitleComponents/TitleComponent";
import { Ctx } from "../DataContext";

export const HomePage3 = () => {

	const context = useContext(Ctx);
	const {interfaceType,}=context;
	const backButton = () => console.log("Bottone");
	const theme=useTheme();     
	return (
		<>
			<Header 
				bankTitle="Test" 
				bankLogo={getCompletePathImage("icon-52x52.png")} 
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
				minHeight="70vmin"
				justifyContent={"center"}
				ml={3} 
			>
				{interfaceType ?  <CardLayout /> : <ManualLayout />}
			</Box>
			<Footer disabled={false} backButton={backButton} />
		</>
	);	
};
