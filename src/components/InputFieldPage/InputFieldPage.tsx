import { Box } from "@mui/system";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { NavigateFunction } from "react-router-dom";
import { Header } from "../Header_old";
import { TitleComponent } from "../TitleComponents/TitleComponent";
import { getCompletePathImage } from "../../utils/Commons";
import { CustomTextField } from "../CustomTextField/CustomtextField";
import { Footer } from "../Footer";

type Prop = {
	title: string;
	subTitle: string;
	charCounter: number;
	setCharCounter: React.Dispatch<React.SetStateAction<number>>;
	error: boolean;
	setError: React.Dispatch<React.SetStateAction<boolean>>;
	theme: Theme;
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	endIconVisible: boolean;
	setEndIconVisible: React.Dispatch<React.SetStateAction<boolean>>;
	value: any;
	setValue: any;
	maxLength: number;
	navigate: NavigateFunction;
	route: string;
	backButton: NavigateFunction;
};

export const InputFieldPage = ({ 
	title,
	subTitle, 
	charCounter,
	setCharCounter,
	error,
	setError,
	theme,
	text,
	setText,
	endIconVisible,
	setEndIconVisible,
	value,
	setValue,
	maxLength,
	route,
	navigate,
	backButton  
}: Prop) => {

	useEffect(() => {
		if(value !== "") {
			setText(value);
			setCharCounter(value.length);
		}
	}, []);

	const handleChange = (e: React.ChangeEvent<any>) => {
		const regex = /^[0-9\b]+$/;
		if (e.target.value === "" || regex.test(e.target.value)) {
			setText(e.target.value);
			setCharCounter(e.target.value.length);
			setValue(e.target.value);
		}
	};

	const enebledSubmit = (value: string) => !!(value.length !== 0);

	const submit = (value: string) => {
		if (value.length < maxLength) {
		  setError(true);
		  setEndIconVisible(true);
		  console.log("value: Error!");
		} else {
		  setError(false);
		  setEndIconVisible(true);
		  setValue(value);
		  console.log("value: ", value);
		  navigate(route);
		}
	};

	useEffect(() => {
		if (text.length === maxLength) {
		  setEndIconVisible(true);
		  setError(false);
		} 

		if(!error && text.length < maxLength) {
			setEndIconVisible(false);
		}
	}, [text]);

	return (
		<>
			<Header
				bankTitle="Test"
				bankLogo={getCompletePathImage("icon-52x52.png")}
				serviceDescription="Servizi di pubblica utilità"
			/>
			<Box marginTop={theme.spacing(3)} textAlign={"center"}>
				<TitleComponent
					title={title}
					subTitle={subTitle}
				/>
			</Box>
			<Box display={"flex"} minHeight="70vmin" justifyContent={"center"} alignItems={"center"}>
				<Box justifyContent={"center"} minWidth={"25%"}>
					<CustomTextField
						maxLengthProp={maxLength}
						id={"code"}
						name={"code"}
						label={"Codice Avviso"}
						value={value}
						error={error}
						endIconVisible={endIconVisible}
						icons={endIconVisible ? error ? "Report" : "Success" : undefined}
						onChange={(e) => handleChange(e)}
						variant={"outlined"}
					/>
					<Typography textAlign={"end"} color={error? "red" : ""}>
						{`${charCounter}/${maxLength}`}
					</Typography>
				</Box>
			</Box>
			<Footer
				backButton={() => backButton}
				disabled={!enebledSubmit(text)}
				handleClick={() => submit(text)}
				continueButton={"Continua"}
				endIcon={<ChevronRightIcon color="primary" fontSize="medium" sx={{ ml: "16px" }} />}
			/>
		</>
	);
};
