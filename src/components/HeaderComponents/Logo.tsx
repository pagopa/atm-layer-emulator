import { Box, useTheme } from "@mui/material";

type Props = {
    bankLogo: string;
};

export default function Logo({ bankLogo }: Props) {
	const theme = useTheme();

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
