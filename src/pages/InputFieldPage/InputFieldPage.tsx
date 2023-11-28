import { Box } from "@mui/system";
import { theme } from "@pagopa/mui-italia";
import { useEffect } from "react";
import { Header } from "../../components/Header";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { getCompletePathImage } from "../../utils/Commons";



export const InputFieldPage = () => {
	useEffect(() => {},[]);  
	return (
		<>
			<Header 
				bankTitle="Test" 
				bankLogo={getCompletePathImage("icon-48x48.png")} 
				serviceDescription="Servizi di pubblica utilità" 
			/>
			<Box marginTop={theme.spacing(3)} textAlign={"center"}>
				<TitleComponent 
					title={"Inserisci il codice avviso"} 
					subTitle={"Ha 18 cifre, lo trovi vicino al codice QR."}
				/>
			</Box>
			<Box textAlign={"center"}  marginTop={theme.spacing(3)}>
				
			</Box>	
			
		</>
	);	
};