import { Box, CircularProgress, Typography} from "@mui/material";

type Props = {
	size?: number;
	thickness?: number; 
	marginTop?: string;
	color?: "primary" | "secondary" | "inherit" | "warning" | "success"| "info"| string;
	message?: string;
};

export const Loading = ({size, thickness,marginTop, color, message }:Props) => (

	<Box display={"flex"}  flexDirection={"column"} justifyContent={"center"} alignItems={"center"} sx={{ maxHeight: "calc(100vh-110px)" }}>
		<CircularProgress
			size={size?size:150}
			thickness={thickness?thickness:2}
			sx={{marginTop: marginTop?marginTop:"15%", color: color?color:"primary"}}
		/>
		{message && 
			<Box mt={4}>
				<Typography variant="h6" sx={{fontWeight:400}}>{message}</Typography>
			</Box>
		}
	</Box>		
);