import { Box } from "@mui/material";
import { TouchFooter } from "./FooterComponents/TouchFooter";
import { ManualFooter } from "./FooterComponents/ManualFooter";
import FooterBox from "./FooterComponents/FooterBox";

export const Footer = () => {
	const footerTouch: boolean = true;

	const backButton = () => console.log("Bottone indietro");	

	return (
		<Box 
			component="footer" 
			borderTop={1} 
			borderColor={footerTouch ? "divider" : "transparent" }
			width="100%"
			marginTop="auto"
			position="absolute"
			bottom={0}
		>
			<FooterBox>
				{ footerTouch ? 
					<TouchFooter backButton={backButton}/> : 
					<ManualFooter backButton={backButton}/> 
				}
			</FooterBox>
		</Box>
	);
};
