import { Box, useTheme } from "@mui/material";
import React from "react";

type Props = {
    children?: React.ReactNode;
};

export default function FooterBox({ children }: Props) {
	const theme = useTheme();

	return (
		<Box
			display="flex"
			flexDirection="row"
			alignItems="center"
			maxWidth={"false"}
			py={theme.spacing(3)}
			mr={0}
		>
			{children}
		</Box>
	);
}
