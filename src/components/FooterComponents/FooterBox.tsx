import { Box } from "@mui/material";
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
			py={3}
			mr={0}
		>
			{children}
		</Box>
	);
}
