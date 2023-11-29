import { theme } from "@pagopa/mui-italia";
import { Box, Button, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManualButtonGrid from "../ManualComponents/ManualButtonGrid";
import { themeApp } from "../../assets/jss/themeApp";

type Props = {
    handleClick: () => void;
	continueButton?: string;
	startIcon?: any;
	endIcon?: any;
};

export const ManualFooter = ({ handleClick, continueButton, startIcon, endIcon }: Props) => {

	const secondaryButton = (<Button
		size="large"
		variant="manual"
		onClick={handleClick}
		sx={{justifyContent: "space-between"}}
	>
		<Box>
			{startIcon}
		</Box>
		<Box display="flex" justifyContent={"flex-end"} alignItems="center" fontSize={themeApp.typography.pxToRem(16)}>
			<Box>
				{continueButton}
			</Box>
			<Box ml={themeApp.spacing(1)}>
				{endIcon}
			</Box>
		</Box>
	</Button>);

	return (
		<ManualButtonGrid 
			children1={
				<Button
					size="large"
					variant="manual"
					onClick={handleClick}
					sx={{justifyContent: "flex-start"}}
				>
					<Box display="flex" alignItems="center" textAlign={"start"}>
						<Box mr={themeApp.spacing(1)}><ChevronLeftIcon color="primary" fontSize="medium"/></Box> 
						<Box fontSize={themeApp.typography.pxToRem(16)} >Indietro</Box>
					</Box>
				</Button>
			} 
			children2={
				continueButton ? secondaryButton : undefined }
		/>
	);
};