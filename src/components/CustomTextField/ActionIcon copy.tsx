import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import getIconBySetType from "../../hook/getIconBySetType";

type Props = {
	icon: string;
	color?: string; 
	size?: string; 
	action?: React.MouseEvent;
	pad?: number; 
	border?: boolean; 
	borderRadius?: string;
	bgcolor?: string; 
	transform?: string;  
	disableAction?: boolean; 
	justifyContent?: string; 
	id?: string;
  };

export default function ActionIcon({ icon, color, size, action, pad, border, borderRadius, bgcolor,transform, disableAction, id, justifyContent }: Props) {
	const theme = useTheme();
	const { getIcon } = getIconBySetType();

	return (
		<Box
			alignItems="center"
			justifyContent= {justifyContent? justifyContent : "flexstart"}
			display="flex"
			// style={{border: border ? theme?.customBox?.border : "none", borderRadius: borderRadius ? theme.shape.borderRadius : 0 }}
			bgcolor = {disableAction && bgcolor && bgcolor !== theme.palette.common.white ? theme.palette.grey[500] : bgcolor ? bgcolor : "transparent"} 
		>
			{/* <SettingsOutlinedIcon size="small"  /> */}
			<IconButton 
				id={id} 
				color="primary" 
				aria-label={id} 
				style={{ padding: pad, borderRadius: 0 }} 
			 	disabled={disableAction ? disableAction : false}
				onClick={()=>action}
				 >
				{
					React.createElement(getIcon(icon), {
						style: {
							fontSize: size ? size : "0.8em",
							color: color ? color : theme.palette.common.black,
							transform: transform? transform : ""
						},
					})
				}
			</IconButton>
		</Box>
	);
}
