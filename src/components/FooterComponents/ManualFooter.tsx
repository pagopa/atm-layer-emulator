import ManualButtonGrid from "../ManualComponents/ManualButtonGrid";
import { ManualButton } from "../ManualComponents/ManualButton";

type Props = {
    handleClick: () => void;
	label: string;
	style?: React.CSSProperties;
};

export const ManualFooter = ({ handleClick, label, style }: Props) =>  (
	<ManualButtonGrid>
		<ManualButton 
			handleClick={() => handleClick()} 
			label={label} 
			style={style}/>
	</ManualButtonGrid>
);