import { Box, Button, Grid, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { theme } from "@pagopa/mui-italia";

type Props = {
    handleClick: () => void;
	label: string;
	style?: React.CSSProperties;
	endIcon?: any;
};

export const ManualButton = ({ handleClick, label, style, endIcon }: Props) =>{ 
	
	const buttonStyle = {
		...style, 
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width:"100%",
		minHeight: theme.spacing(8.5),
	};

	return (
		<Button
			size="large"
			startIcon={<ChevronLeftIcon color="primary" fontSize="medium" />}
			variant="outlined"
			onClick={handleClick}
			sx={buttonStyle}
		>
			<Box display="flex" alignItems="center" fontSize={theme.typography.pxToRem(16) }>
				{label}
			</Box>
			<Box marginLeft="auto" marginTop={theme.spacing(1)}>
				{endIcon}
			</Box>
		</Button>
	);};
