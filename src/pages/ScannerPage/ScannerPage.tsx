import { Box } from "@mui/system";
import { theme } from "@pagopa/mui-italia";
import KeyboardHideOutlinedIcon from "@mui/icons-material/KeyboardHideOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import { useContext } from "react";
import { Header } from "../../components/Header";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { getCompletePathImage } from "../../utils/Commons";
import { Footer } from "../../components/Footer";
import { Ctx } from "../../DataContext";


export const ScannerPage = () => {

	const backButton = () => console.log("Bottone");

	const context = useContext(Ctx);
	const {interfaceType}=context;
            
	return (
		<>
			<Header 
				bankTitle="Test" 
				bankLogo={getCompletePathImage("icon-48x48.png")} 
				serviceDescription="Servizi di pubblica utilità" 
			/>
			<Box marginTop={theme.spacing(3)} textAlign={"center"}>
				<TitleComponent 
					title={"Scansiona il codice QR"} 
					subTitle={"Avvicinalo al lettore luminoso posizionato sopra allo schermo."}
				/>
			</Box>
			<Box textAlign={"center"}  marginTop={theme.spacing(3)}>
				<img src={getCompletePathImage("img-200x200.png")} />
			</Box>
			
			{
				interfaceType ? 
					<>
						<Box textAlign={"center"} marginTop={theme.spacing(3)}>
							<Button
								color="primary"
								size="medium"
								startIcon={<KeyboardHideOutlinedIcon color="primary"/>}
								variant="outlined"
								onClick={backButton}
							>
                    Inserisci tu i dati
							</Button>
						</Box>
						<Footer backButton={backButton} /> 
					</>
					: <Footer 
						backButton={backButton} 
						continueButton={"Inserisci tu i dati"} 
						startIcon={<KeyboardHideOutlinedIcon color="disabled" fontSize="medium"/>}
						endIcon={<ChevronRightIcon color="primary" fontSize="medium" />}
					/>
			}
			
			
		</>
	);	
};