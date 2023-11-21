import { Button, useTheme } from "@mui/material";
import React from "react";


type Props = {
    touch?: boolean;
    icon?:any;
    backButton?:any;
};

export default function FooterButton({
	touch=false, 
	icon,
	backButton
}:Props) {
	const theme = useTheme();
	const borderBottons = { borderRadius: theme.shape.borderRadius, width: "80%" };
	return (
		<React.Fragment>
			{touch===true?
				<Button
					color="primary"
					size="medium"
					startIcon={icon}
					variant="outlined"
					sx={borderBottons}
					onClick={backButton}
				>
                Indietro
				</Button>
				: <Button
					size="large"
					startIcon={icon}
					variant="outlined"
					onClick={backButton}
					style={{
						fontSize: "1.5rem",
						height: "100%",
						width: "100%",
						color: "black",
						borderColor: theme.colorVariant?.customBorderColor,
						borderRadius: theme.shape.borderRadius,
						justifyContent: "flex-start",
					}}
				>
            Indietro
				</Button>
			}
		</React.Fragment>
	);
}
