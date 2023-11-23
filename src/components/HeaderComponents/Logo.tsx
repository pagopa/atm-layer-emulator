import { Box } from "@mui/material";
import { theme } from "@pagopa/mui-italia";

type Props = {
    bankLogo: string;
};

export default function Logo({ bankLogo }: Props) {

	return (
		<Box display="flex" alignItems="center" mr={theme.spacing(2)}>
			<img
				src={bankLogo}
				alt="Logo"
				style={{ maxHeight: theme.spacing(6) }}
			/>
		</Box>
	);
}
