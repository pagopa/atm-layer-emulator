import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled, useThemeProps, alpha } from "@mui/material/styles";

interface CustomButtonProps extends ButtonProps {
  startIcon?: React.ReactNode;
  continueButton?: React.ReactNode;
  endIcon?: React.ReactNode;
  label?: string;
  direction?: "left" | "right";
}

const CustomButtonRoot = styled(Button, {
	shouldForwardProp: (prop) => prop !== "theme",
})<CustomButtonProps>(({ theme, direction }) => ({
	// TODO: use the variat of typography
	fontSize: theme.typography.pxToRem(16),
	height: "100%",
	width: "100%",
	color: "black",
	display: "flex",
	justifyContent: direction === "left" ? "flex-start" : "space-between",
	border: "1px solid lightgray",
	borderRadius: "8px",
	alignItems: "center",
	"&:hover": {
		borderWidth: "2px",
		backgroundColor: "#DEDEDE",
	},
	"&:disabled": {
		borderWidth: "2px",
	},
	"&.Mui-focusVisible": {
		boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main ?? "", 0.35)}`,
	},
}));

const CustomButton = React.forwardRef<HTMLDivElement, CustomButtonProps>(
	function CustomButton(
		{ startIcon, continueButton, endIcon, label, direction, ...other }

	) {
		const props = useThemeProps({ props: other, name: "MuiCustomButton" });

		return (
			<CustomButtonRoot {...props}>
				{direction === "right" ? (
					<>
						<Box>
							{startIcon}
						</Box>
						<Box display="flex" justifyContent="flex-end" alignItems="center">
							<Box>
								{continueButton}
							</Box>
							<Box ml={1} mt={0.5}>
								{endIcon}
							</Box>
						</Box>
					</>
				) : (
					<>
						<Box display="flex" alignItems="center">
							{startIcon}
							{label}
						</Box>
						<Box marginLeft="auto" marginTop={1}>
							{endIcon}
						</Box>
					</>
				)}
			</CustomButtonRoot>
		);
	}
);

export default CustomButton;
