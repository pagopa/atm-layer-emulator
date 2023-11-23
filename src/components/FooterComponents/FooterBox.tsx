import { Box } from "@mui/material";
import { theme } from "@pagopa/mui-italia";
import React from "react";

type Props = {
    children?: React.ReactNode;
};

export default function FooterBox({ children }: Props) {
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
