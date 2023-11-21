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
					// borderRadius: "8px",
				}}>
				<CardContent sx={{ pt: "12px", pb: "8px", px: "12px"}}>
					<Typography 
						fontSize={"1.5rem"} 
						fontWeight={theme.typography.sidenav.fontWeight}  
						gutterBottom
					>
						{title}
					</Typography>
								
				</CardContent>
				<CardActions sx={{ pt: "0px", pb: "12px", px: "12px"}}>
					<Grid item xs={6} alignContent="center">
						<Box textAlign="start" sx={{ pt: "12px" }}>
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