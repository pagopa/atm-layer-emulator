import { Box, CircularProgress} from "@mui/material";

type Props = {
	size?: number;
	thickness?: number; 
	marginTop?: string;
	color?: "primary" | "secondary" | "inherit" | "warning" | "success"| "info"| string;
};

export const Loading = ({size, thickness,marginTop, color }:Props) => (

	<Box display={"flex"}  flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{ maxHeight: "calc(100vh-110px)" }}>
		<CircularProgress
			size={size?size:150}
			thickness={thickness?thickness:2}
			sx={{marginTop: marginTop?marginTop:"15%", color: color?color:"white"}}
		/>
	</Box>		
);