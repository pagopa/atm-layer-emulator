import { Typography } from "@mui/material";
import { theme } from "@pagopa/mui-italia";

type Props = {
    title: string;
    subTitle: string;
};

export const TitleComponent = ({ title, subTitle }: Props) => (
	<>
		<Typography variant="h5" textAlign={"start"}> 
			{title} 
		</Typography>
		<Typography
			mt={1}
			variant="body2"
			noWrap
			fontWeight={theme.typography.body2.fontWeight}
			color={"text.secondary"}
			textAlign={"start"}
		>
			{subTitle}
		</Typography>
	</>
);