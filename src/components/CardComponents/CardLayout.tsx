import { Box } from "@mui/material";
import { LogoPagoPAProduct, theme } from "@pagopa/mui-italia";
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

	const cardComponents = [
		{
			title: "Paga un avviso pagoPA",
			logo: <LogoPagoPAProduct 
				color="default" 
				title={""} 
				size={32} 
			/>,
		},
		{
			title: "Gestisci le iniziative ID Pay",
			logo: <LogoPagoPAProduct 
				color="default" 
				title={""} 
				size={32} 
			/>,
		}
	];
    
	return (

		<>
			<Box 
				style={{ 
					display: "grid", 
					gridTemplateColumns: "repeat(12, 1fr)", 
					gap: theme.spacing(3),
					marginTop: theme.spacing(0),
				}}>
				{
					cardComponents.map((e, i) => (
						<Box style={{ gridColumn: "span 3" }} key={i}>
							<CardComponent
								key={i}
								title={e.title} 
								logo={e.logo}
								handleClick={() => handleClickFunction(i)} 
							/>
						</Box>	)
					)
				}
			</Box></>
	);
};