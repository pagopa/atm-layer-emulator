import {Box, Grid, Typography } from "@mui/material";
import { theme } from "@pagopa/mui-italia";

type Props = {
    title: string;
    icon: any;
    children?: JSX.Element;
};

export const CommonErrorPage = ({ title, icon, children }: Props) => (
	<>
		<Box 
			height="90vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Grid container textAlign={"center"} >
				<Grid item xs={12}>
					{icon}
				</Grid>
				<Grid item xs={12} marginTop={theme.spacing(2)}>
					<Typography fontSize={theme.typography.pxToRem(17.5)} fontWeight={theme.typography.fontWeightBold}>
						{title}
					</Typography>
				</Grid>
				{
					children && <Grid item xs={12} mt={theme.spacing(0)}>
						{children}
					</Grid>
				}
			</Grid>
		</Box>
	</>
);
