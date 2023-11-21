import { Grid } from "@mui/material";
import { LogoPagoPAProduct } from "@pagopa/mui-italia";
import { CardComponent } from "./CardComponent";


export const CardLayout = () => {

	const handleClickFunction = (key: number) => {
		switch (key) {
		case 1: 
			return console.log("Card 1 clicked!");
		case 2: 
			return console.log("Card 2 clicked!");
		default:
			return console.log("Error");
		}
	};
    
	return (
		<Grid container my={2} gap={3}>
			<Grid item xs={3}>
				<CardComponent
					title={"Paga un avviso pagoPA"} 
					logo={<LogoPagoPAProduct 
						color="default" 
						title={""} 
						size={32} 
					/>}
					handleClick={() => handleClickFunction(1)} 
				/>	
			</Grid>				
			<Grid item xs={3}>
				<CardComponent
					key={2} 
					title={"Gestisci le iniziative ID Pay"} 
					logo={<LogoPagoPAProduct 
						color="default" 
						title={""} 
						size={32} 
					/>} 
					handleClick={() => handleClickFunction(2)} 
				/>
			</Grid>
		</Grid>
	);};