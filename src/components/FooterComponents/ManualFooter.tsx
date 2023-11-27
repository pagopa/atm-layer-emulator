import { theme } from "@pagopa/mui-italia";
import { Box, Button, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManualButtonGrid from "../ManualComponents/ManualButtonGrid";

type Props = {
    handleClick: () => void;
	continueButton?: string;
	startIcon?: any;
	endIcon?: any;
};

export const ManualFooter = ({ handleClick, continueButton, startIcon, endIcon }: Props) => {

	const themeCustom = useTheme();
	 
	const buttonStyle = {
		fontSize: theme.typography.pxToRem(12),
		height: "100%",
		width: "100%",
		color: "black",
		borderColor: themeCustom.colorVariant?.customBorderColor,
		display: "flex",
		alignItems: "center",
		minHeight: theme.spacing(8.5),
	};

	const secondaryButton = (<Button
		size="large"
		variant="outlined"
		onClick={handleClick}
		sx={{...buttonStyle, justifyContent: "space-between"}}
	>
		<Box>
			{startIcon}
		</Box>
		<Box display="flex" justifyContent={"flex-end"} alignItems="center" fontSize={theme.typography.pxToRem(16)}>
			<Box>
				{continueButton}
			</Box>
			<Box ml={theme.spacing(1)}>
				{endIcon}
			</Box>
		</Box>
	</Button>);

	return (
		<ManualButtonGrid 
			children1={
				<Button
					size="large"
					variant="outlined"
					onClick={handleClick}
					sx={{...buttonStyle, justifyContent: "flex-start"}}
				>
					<Box display="flex" alignItems="center" textAlign={"start"}>
						<Box mr={theme.spacing(1)}><ChevronLeftIcon color="primary" fontSize="medium"/></Box> 
						<Box fontSize={theme.typography.pxToRem(16)} >Indietro</Box>
					</Box>
				</Button>
			} 
			children2={
				continueButton ? secondaryButton : undefined }
		/>
	);
};