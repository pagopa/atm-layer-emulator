import { Box } from "@mui/material";
import { useContext } from "react";
import { Ctx } from "../DataContext";
import { TouchFooter } from "./FooterComponents/TouchFooter";
import FooterBox from "./FooterComponents/FooterBox";
import { ManualFooter } from "./FooterComponents/ManualFooter";

type Props = {
	backButton: () => void;
	continueButton?: string;
	startIcon?: any;
	endIcon?: any;
};
export const Footer = ({ backButton, continueButton, startIcon, endIcon }: Props) => {
	
	const context = useContext(Ctx);
	const {interfaceType}=context;


	return (
		<Box 
			component="footer" 
			borderTop={1} 
			borderColor={interfaceType ? "divider" : "transparent" }
			width="100%"
			marginTop="auto"
			position="absolute"
			bottom={0}
		>
			<FooterBox>
				{ interfaceType ? 
					<TouchFooter backButton={backButton} continueButton={continueButton}/> : 
					<ManualFooter 
						handleClick={backButton}
						continueButton={continueButton}
						startIcon={startIcon}
						endIcon={endIcon}
					/>
				}
			</FooterBox>
		</Box>
	);
};
