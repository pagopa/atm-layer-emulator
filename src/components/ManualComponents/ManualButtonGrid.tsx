import { Grid } from "@mui/material";
import { theme } from "@pagopa/mui-italia";

type Props = {
    children?: React.ReactNode;
};

export default function ManualButtonGrid({ children }: Props) {
	return (
		<Grid container ml={theme.spacing(3)}>
			<Grid item xs={5} width="100%" minHeight={theme.spacing(8)}>
				{children}
			</Grid>
		</Grid>
	);
}