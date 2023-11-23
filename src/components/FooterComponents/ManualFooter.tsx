

import { Button, Grid, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManualButtonGrid from "../ManualComponents/ManualButtonGrid";
import { ManualButton } from "../ManualComponents/ManualButton";

type Props = {
    handleClick: () => void;
	label: string;
	style?: React.CSSProperties;
};

export const ManualFooter = ({ handleClick, label, style }: Props) =>  {
    
	const theme = useTheme();

	return (
		<ManualButtonGrid>
			<ManualButton 
				handleClick={() => handleClick()} 
				label={label} 
				style={style}/>
		</ManualButtonGrid>
	);};