
import { useState, useContext, SetStateAction } from "react";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { InputFieldPage } from "../../components/InputFieldPage/InputFieldPage";
import routes from "../../routes";


const EcFiscalCodeInput = () => {

	const [charCounter, setCharCounter] = useState(0);
	const [endIconVisible, setEndIconVisible] = useState(true);
	const [error, setError] = useState(false);
	const theme = useTheme();
	const [text, setText] = useState("");
	const { ecFiscalCodeValue, setEcFiscalCodeValue} = useContext(Ctx);
	const navigate = useNavigate();
	const route = "/";

	return (
		<InputFieldPage 
			title={"Inserisci il codice fiscale dell’Ente Creditore"} 
			subTitle={"Ha 11 cifre, lo trovi vicino al codice QR."} 
			charCounter={charCounter} 
			setCharCounter={setCharCounter} 
			error={error} 
			setError={setError} 
			theme={theme} 
			text={text} 
			setText={setText} 
			endIconVisible={endIconVisible} 
			setEndIconVisible={setEndIconVisible} 
			value={ecFiscalCodeValue} 
			setValue={setEcFiscalCodeValue} 
			maxLength={11}
			route={route}
			navigate={() => navigate(route)}
			backButton={() => navigate(routes.WARNING_CODE)}
		/>
	);

};

export default EcFiscalCodeInput;