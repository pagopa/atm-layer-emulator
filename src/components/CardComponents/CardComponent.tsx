import { Card, CardContent, Typography, CardActions, Grid, IconButton, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { LogoPagoPAProduct, theme } from "@pagopa/mui-italia";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Prop = {
    title: string;
    logo: any;
    handleClick: () => void;
};

export const CardComponent = ({ title, logo, handleClick }: Prop) => {

	const themeCustom = useTheme();

	const cardContentStyle ={
		firstCard: { pt: theme.spacing(1), pb: theme.spacing(0), px: theme.spacing(1.5) },
		secondCard: { pt: theme.spacing(0), pb: theme.spacing(1.5), px: theme.spacing(1.5) }
	};

	return (
		<Box >
			<Card /* sx={cardStyle} */>
				<CardContent sx={cardContentStyle.firstCard}>
					<Typography 
						variant="sidenav"  
						gutterBottom
					>
						{title}
					</Typography>
								
				</CardContent>
				<CardActions sx={cardContentStyle.secondCard}>
					<Grid item xs={6} alignContent="center">
						<Box textAlign="start" paddingTop={theme.spacing(1)}>
							{logo}
						</Box>
					</Grid>
					<Grid item xs={6} alignContent="center">
						<Box textAlign="end">
							<IconButton size="small" onClick={handleClick}> 
								<ArrowForwardIosIcon fontSize="small" color="primary" />
							</IconButton> 
						</Box>
					</Grid>
				</CardActions>
			</Card>
		</Box>
	);
};