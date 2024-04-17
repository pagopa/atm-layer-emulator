import { Box, Button, Typography, useTheme } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import { useNavigate } from "react-router-dom";
import BoxPageLayout from "../Layout/BoxPageLayout";
import ROUTES from "../../routes";
import IconBox from "../../utils/Commons/IconBox";

type Props = {
    title: string;
};

const ErrorPage = ({title}:Props) => {
	const navigate = useNavigate();
	const theme = useTheme();

	console.log(useTheme);
	return (
		<BoxPageLayout >
			<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"50vh"}> 
				<Box>
					<ReportIcon color="error" sx={{ fontSize: 100 }} data-testid="error-icon" />
				</Box>
				<Box mb={8} mt={1}>
					<Typography variant="h6">
						{title}
					</Typography>
				</Box>
				<Button
					id="home-button-error-page" 
					variant="contained" 
					onClick={()=>navigate(ROUTES.HOME)} 
					startIcon={<IconBox icon={"HomeOutlined"} 
						color={theme.palette.common.white} pad={0.5} 
						size={"1em"} 
						marg={"5px 0px 0px 0px"} />}>
					Torna alla Home
				</Button>
			</Box>
		</BoxPageLayout>
	);
};


export default ErrorPage;
