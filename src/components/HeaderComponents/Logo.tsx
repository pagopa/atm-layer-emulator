import { Box } from "@mui/material";
import React from "react";

type Props = {
    bankLogo: string;
};

export default function Logo({bankLogo}:Props) {
	return (
		<Box display="flex" alignItems="center" mr={2}>
			<img
				src={bankLogo}
				alt="Logo"
				style={{maxHeight:"2.5em"}}
			/>
		</Box>
	);
}
