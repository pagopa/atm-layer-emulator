import { AppBar } from "@mui/material";
import { Typography, Box } from "@mui/material";
import { theme } from "@pagopa/mui-italia";
import Logo from "./HeaderComponents/Logo";

type HeaderProps = {
    bankTitle?: string;
    bankLogo: string;
	serviceDescription: string;
};

export const Header = ({
	bankTitle,
	bankLogo,
	serviceDescription
}: HeaderProps) => (
	<AppBar position="static" elevation={0} sx={{backgroundColor: theme.palette.background.paper}}>
		<Box 
			display="flex" 
			flexDirection="row"
			alignItems="center" 
			justifyContent="space-between"	
			px={2}
			sx={{
				borderBottom: 1,
				borderColor: "divider",
				minHeight: "3.5em",
			}}
		>
			<Box display="flex" flexDirection="row" alignItems="center">

				<Logo bankLogo={bankLogo} />
				<Box display="flex" alignItems="center">
					<Typography variant="body1" noWrap fontWeight={theme.typography.h6.fontWeight}>
						{bankTitle}
					</Typography>
				</Box>
			</Box>
			<Box display="flex" alignItems="center">
				<Typography
					variant="body1"
					noWrap
				>
					{serviceDescription}
				</Typography>
			</Box>
		</Box>
	</AppBar>
);