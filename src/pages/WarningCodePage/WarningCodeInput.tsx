
import { useState, useContext, SetStateAction } from "react";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { InputFieldPage } from "../../components/InputFieldPage/InputFieldPage";
import routes from "../../routes";


const WarningCodeInput = () => {

	const [charCounter, setCharCounter] = useState(0);
	const [endIconVisible, setEndIconVisible] = useState(true);
	const [error, setError] = useState(false);
	const theme = useTheme();
	const [text, setText] = useState("");
	const { warningCodeValue, setWarningCodeValue} = useContext(Ctx);
	const navigate = useNavigate();
	const route = routes.EC_FISCAL_CODE;

	return (
		<InputFieldPage 
			title={"Inserisci il codice avviso"} 
			subTitle={"Ha 18 cifre, lo trovi vicino al codice QR."} 
			charCounter={charCounter} 
			setCharCounter={setCharCounter} 
			error={error} 
			setError={setError} 
			theme={theme} 
			text={text} 
			setText={setText} 
			endIconVisible={endIconVisible} 
			setEndIconVisible={setEndIconVisible} 
			value={warningCodeValue} 
			setValue={setWarningCodeValue} 
			maxLength={18}
			route={route}
			navigate={() => navigate(route)}
			backButton={() => navigate(routes.SCANNER_PAGE)}
		/>
	);

};

export default WarningCodeInput;