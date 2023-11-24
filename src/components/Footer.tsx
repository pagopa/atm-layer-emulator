import { Box, useTheme } from "@mui/material";
import { theme } from "@pagopa/mui-italia";
import { useCtx } from "../DataContext";
import { TouchFooter } from "./FooterComponents/TouchFooter";
import FooterBox from "./FooterComponents/FooterBox";
import { ManualFooter } from "./FooterComponents/ManualFooter";

type Props = {
	backButton: () => void;
	continueButton?: string;
};
export const Footer = ({ backButton, continueButton }: Props) => {
	
	const themeCustom = useTheme();
	const { interfaceType, setInterfaceType } = useCtx();


	const style = {
		fontSize: theme.typography.pxToRem(12),
		height: "100%",
		width: "100%",
		color: "black",
		borderColor: themeCustom.colorVariant?.customBorderColor,
		justifyContent: "flex-start",
	};

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
					<TouchFooter backButton={backButton} /> : 
					<ManualFooter 
						handleClick={backButton} 
						label="Indietro" 
						style={style}
					/>
				}
			</FooterBox>
		</Box>
	);
};
