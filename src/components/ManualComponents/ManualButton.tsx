import { Box, Button, Grid, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { theme } from "@pagopa/mui-italia";
import { ThemeProvider } from "@emotion/react";
import { themeButton } from "../../assets/jss/themeApp";

type Props = {
    handleClick: () => void;
	label: string;
	style?: React.CSSProperties;
	endIcon?: any;
};

export const ManualButton = ({ handleClick, label, style, endIcon }: Props) => 

	 /* First try, custom button variant */

//  (<Button
// 	size="large"
// 	startIcon={<ChevronLeftIcon color="primary" fontSize="medium" />}
// 	variant="manual"
// 	onClick={handleClick}
// >
// 	<Box display="flex" alignItems="center" fontSize={theme.typography.pxToRem(16) }>
// 		{label}
// 	</Box>
// 	<Box marginLeft="auto" marginTop={theme.spacing(1)}>
// 		{endIcon}
// 	</Box>
// </Button>);

/* Second try, custom button with theme provider and a custom theme */

	(<ThemeProvider theme={themeButton}>
		<Button
			size="large"
			startIcon={<ChevronLeftIcon color="primary" fontSize="medium" />}
			onClick={handleClick}
		>
			<Box display="flex" alignItems="center" fontSize={theme.typography.pxToRem(16) }>
				{label}
			</Box>
			<Box marginLeft="auto" marginTop={theme.spacing(1)}>
				{endIcon}
			</Box>
		</Button>
	 </ThemeProvider>	
	);
