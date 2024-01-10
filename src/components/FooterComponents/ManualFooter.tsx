

import { Button, Grid, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManualButtonGrid from "../ManualComponents/ManualButtonGrid";
import CustomButton from "../ManualComponents/CustomManualBottom";

type Props = {
    handleClick: () => void;
	disabled: boolean;
	handleSubmit?: () => void;
	continueButton?: string;
	startIcon?: any;
	endIcon?: any;
};

export const ManualFooter = ({ handleClick, disabled, handleSubmit, continueButton, startIcon, endIcon }: Props) => {

	const secondButton = (
		<CustomButton
			size="large"
			onClick={handleSubmit}
			startIcon={startIcon}
			continueButton={continueButton}
			endIcon={endIcon}
			direction="right"
			disabled={disabled}
		/>
	);

	return (
		<ManualButtonGrid 
			children1={
				<CustomButton
					size="large"
					onClick={handleClick}
					startIcon={<ChevronLeftIcon color="primary" fontSize="medium" sx={{ mr: "16px" }} />}
					label="Indietro"
					direction="left"
				/>
			} 
			children2={
				continueButton ? secondButton : undefined }
		/>
	);
};
