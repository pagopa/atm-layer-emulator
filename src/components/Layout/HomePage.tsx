import {Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { theme } from "@pagopa/mui-italia";
import { Header } from "../Header";
import { getCompletePathImage } from "../../utils/Commons";
import { Footer } from "../Footer";
import { CardLayout } from "../CardComponents/CardLayout";
import { ManualLayout } from "../ManualComponents/ManualLayout";
import { useCtx } from "../../DataContext";
import { TitleComponent } from "../TitleComponents/TitleComponent";

export const HomePage = () => {

	const { interfaceType, setInterfaceType } = useCtx(); 
	useEffect(() => setInterfaceType(false), []);
            
	return (
		<>
			<Header 
				bankTitle="Test" 
				bankLogo={getCompletePathImage("icon-48x48.png")} 
				serviceDescription="Servizi di pubblica utilità" 
			/>
			<Box style={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(3) }}>
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
			<Footer />
		</>
	);	
};
