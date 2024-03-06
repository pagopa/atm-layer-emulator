import { Grid } from "@mui/material";
import { theme } from "../../assets/jss/themePagoPa";

type Props = {
    children1?: React.ReactNode;
	children2?: React.ReactNode;
};

export default function ManualButtonGrid({ children1, children2 }: Props) {
	return (
		<Grid container mx={theme.spacing(3)} justifyContent={"space-between"}>
			<Grid item xs={5} width="100%">
				{children1}
			</Grid>
			<Grid item xs={5} width="100%">
				{children2}
			</Grid>
		</Grid>
	);
}