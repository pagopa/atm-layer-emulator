import { Box } from "@mui/system";
import KeyboardHideOutlinedIcon from "@mui/icons-material/KeyboardHideOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { getCompletePathImage } from "../../utils/Commons";
import { Footer } from "../../components/Footer";
import { Ctx } from "../../DataContext";
import routes from "../../routes";


export const ScannerPage = () => {

	const navigate = useNavigate();
	const { interfaceType } = useContext(Ctx);;
            
	return (
		<>
			<Header 
				bankTitle="Test"
				bankLogo={getCompletePathImage("icon-52x52.png")} 
				serviceDescription="Servizi di pubblica utilità" 
			/>
			<Box marginTop={3} textAlign={"center"}>
				<TitleComponent 
					title={"Scansiona il codice QR"} 
					subTitle={"Avvicinalo al lettore luminoso posizionato sopra allo schermo."}
				/>
			</Box>
			<Box textAlign={"center"}  marginTop={7}>
				<img src={getCompletePathImage("img-200x200.png")} width={"300px"} height={"300px"}/>
			</Box>
			
			{
				interfaceType ? 
					<>
						<Box textAlign={"center"} marginTop={3}>
							<Button
								color="primary"
								size="medium"
								startIcon={<KeyboardHideOutlinedIcon color="primary"/>}
								variant="outlined"
								onClick={() => navigate(routes.WARNING_CODE)}
							>
                    Inserisci tu i dati
							</Button>
						</Box>
						<Footer disabled={false} backButton={() => navigate("/")} /> 
					</>
					: <Footer 
						backButton={() => navigate("/")}
						handleClick={() => navigate(routes.WARNING_CODE)}
						disabled={false}
						continueButton={"Inserisci tu i dati"} 
						startIcon={<KeyboardHideOutlinedIcon color="disabled" fontSize="medium"/>}
						endIcon={<ChevronRightIcon color="primary" fontSize="medium" sx={{ ml: "16px" }}/>}
					/>
			}
			
			
		</>
	);	
};