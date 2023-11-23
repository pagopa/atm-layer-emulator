


import { Button, Grid, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type Props = {
    backButton: () => void;
};

export const ManualFooter = ({ backButton }: Props) =>  {
    
	const theme = useTheme();

	return (
		<Grid container ml={3} >
			<Grid item xs={5} width="100%" minHeight={"70px"}>
				<Button
					size="large"
					startIcon={<ChevronLeftIcon color="primary" style={{ marginInline: "12px", fontSize: "28px" }} />}
					variant="outlined"
					onClick={backButton}
					style={{
						fontSize: "1.5rem",
						height: "100%",
						width: "100%",
						color: "black",
						borderColor: theme.colorVariant?.customBorderColor,
						borderRadius: theme.shape.borderRadius,
						justifyContent: "flex-start",
					}}
				>
                Indietro
				</Button>
			</Grid>
		</Grid>  
	);};
