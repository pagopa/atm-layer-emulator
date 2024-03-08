import { Box, Typography } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import BoxPageLayout from "./Layout/BoxPageLayout";

const ErrorPage = () => (
	<BoxPageLayout >
		<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"80vh"}> 
			<Box >
				<ReportIcon color="error" sx={{ fontSize: 100 }} />
			</Box>
			<Box>
				<Typography variant="h6">
                    404 - Qualcosa è andato storto
				</Typography>
			</Box>
		</Box>
	</BoxPageLayout>
);


export default ErrorPage;
