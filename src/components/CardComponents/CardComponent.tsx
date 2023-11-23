import { Card, CardContent, Typography, CardActions, Grid, IconButton, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { LogoPagoPAProduct } from "@pagopa/mui-italia";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Prop = {
    title: string;
    logo: any;
    handleClick: () => void;
};

export const CardComponent = ({ title, logo, handleClick }: Prop) => {

	const theme = useTheme();

	return (
		<Box >
			<Card
				style={{ 
					width: "100%", 
					border: theme.cardStyle?.border,
					borderColor: "lightgrey",
					maxHeight: theme.spacing(18)
				}}>
				<CardContent sx={{ pt: theme.spacing(1), pb: theme.spacing(0), px: theme.spacing(1.5) }}>
					<Typography 
						fontSize={theme.typography.pxToRem(18)}
						fontWeight={theme.typography.sidenav.fontWeight}  
						gutterBottom
					>
						{title}
					</Typography>
								
				</CardContent>
				<CardActions sx={{ pt: theme.spacing(0), pb: theme.spacing(1.5), px: theme.spacing(1.5) }}>
					<Grid item xs={6} alignContent="center">
						<Box textAlign="start" paddingTop={theme.spacing(1)}>
							{logo}
						</Box>
					</Grid>
					<Grid item xs={6} alignContent="center">
						<Box textAlign="end"><IconButton size="small" onClick={handleClick}> 
							<ArrowForwardIosIcon fontSize="small" color="primary" />
						</IconButton> </Box>
					</Grid>
				</CardActions>
			</Card>
		</Box>
	);
};