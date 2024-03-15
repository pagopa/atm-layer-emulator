import React from "react";
import { Box, useTheme } from "@mui/material";
import getIconBySetType from "../../hook/getIconBySetType";

type Props = {
	icon: string;
	color?: string; 
	size?: string; 
	pad?: number|string; 
	marg?: number|string; 
	transform?: string;
	id?: string;
  };

export default function IconBox({ icon, color, size, marg, pad,transform, id }: Props) {
	const theme = useTheme();
	const { getIcon } = getIconBySetType();

	return (
		<Box
			data-testid="icon-box"
			m={marg}
			p={pad}
			id={id}
		>
			{
				React.createElement(getIcon(icon), {
					style: {
						fontSize: size ?? "1em",
						color: color ?? theme.palette.common.black,
						transform: transform ?? ""
					},
				})
			}
		</Box>
	);
}
