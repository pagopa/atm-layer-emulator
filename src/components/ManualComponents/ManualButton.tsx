import { Box, Button, Grid, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { theme } from "@pagopa/mui-italia";

type Props = {
    handleClick: () => void;
	label: string;
	style?: React.CSSProperties;
	endIcon?: any;
};

export const ManualButton = ({ handleClick, label, style, endIcon }: Props) =>  (
	<Button
		size="large"
		startIcon={<ChevronLeftIcon color="primary" style={{ fontSize: theme.typography.pxToRem(28) }} />}
		variant="outlined"
		onClick={handleClick}
		style={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			...style,
		}}
	>
		<Box style={{ display: "flex", alignItems: "center", fontSize: theme.typography.pxToRem(16) }}>
			{label}
		</Box>
		<Box style={{ marginLeft: "auto", marginTop: theme.spacing(1) }}>
			{endIcon}
		</Box>
	</Button>
);
