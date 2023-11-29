import { Grid, useTheme } from "@mui/material";
import { LogoPagoPAProduct, theme } from "@pagopa/mui-italia";
import { ManualButton } from "./ManualButton";

export const ManualLayout = () => {
	const handleClickFunction = (key: number) => {
		switch (key) {
		case 1:
			return console.log("Button 1 clicked!");
		case 2:
			return console.log("Button 2 clicked!");
		default:
			return console.log("clicked!");
		}
	};
	
	const LogoPagoPA = () => (
		  <LogoPagoPAProduct 
		  	title=""
			size={parseInt(theme.spacing(4), 10)}
			color="default"
		/>
	  );

	const buttons = [
		{
			label: "Paga un avviso pagoPA",
			icon: LogoPagoPA(),
		},
		{
			label: "Iniziative ID Pay",
			icon: LogoPagoPA(),
		}
	];

	return (
		<Grid 
			container
			item
			xs={12}
			rowGap={theme.spacing(3)}
		>
		  {buttons.map((e, i) => (
				<Grid
					container
					key={i}
					gap={theme.spacing(3)}
					mr={theme.spacing(3)}
				>
					<Grid item xs={5} >

						<ManualButton
							handleClick={() => handleClickFunction(i)}
							label={e.label}
							endIcon={e.icon}
							key={i}
						/>
					</Grid>
				</Grid>
			))}
		</Grid>
	  );
};