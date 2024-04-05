import { Box, Typography } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import BoxPageLayout from "./Layout/BoxPageLayout";

type Props = {
    title: string;
};

const ErrorPage = ({title}:Props) => (
	<BoxPageLayout >
		<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"80vh"}> 
			<Box >
				<ReportIcon color="error" sx={{ fontSize: 100 }} />
			</Box>
			<Box>
				<Typography variant="h6">
					{title}
				</Typography>
			</Box>
		</Box>
	</BoxPageLayout>
);


export default ErrorPage;
