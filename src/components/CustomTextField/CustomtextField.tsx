import styled from "@emotion/styled";
import { TextField, Theme, TextFieldProps, Tooltip, Box, useTheme, InputAdornment, IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import checks from "../../commons/checks";
import ActionIcon from "./ActionIcon";

type Props = {
	id: string;
	name: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
	endIconVisible: boolean;
	icons?: string;
	variant?: "outlined";
	defaultVal?: string;
	disabled?: boolean;
	type?: string;
	border?: boolean;
	action?: (e: React.MouseEvent<Element, MouseEvent>) => void;
	helperText?: string;
	borderRadius?: string;
	disableAction?: boolean;
	idActionIcon?: string;
	inputProps?: string;
	onKeyDown?: (e: React.KeyboardEventHandler<Element>) => void;
	theme?: Theme;
	maxLengthProp?: number;
};

type CustomTextFieldProps = TextFieldProps & {
	theme?: Theme;
	error?: TextFieldProps["error"];
};

const CustomInput = styled(TextField)<CustomTextFieldProps>(({ theme, error }: CustomTextFieldProps) => ({}));



export const CustomTextField = ({
	id,
	name,
	label,
	value,
	onChange,
	error,
	endIconVisible,
	icons,
	variant,
	defaultVal,
	disabled,
	type,
	border,
	action,
	helperText,
	borderRadius,
	disableAction,
	idActionIcon,
	inputProps,
	onKeyDown,
	theme,
	maxLengthProp
}: Props) => (
	<>
		<CustomInput
			fullWidth
			disabled={disabled}
			onChange={onChange}
			style={icons ? { /* width: "calc(100% - 54px)", */ color: error ? "red" : theme?.palette.primary.main, fontWeight: theme?.typography.fontWeightBold  } : {fontWeight: theme?.typography.fontWeightBold }}
			id={id}
			name={name}
			label={label}
			defaultValue={defaultVal}
			value={value}
			variant="outlined"
			error={error}
			helperText={helperText}
			type={"text"}
			required={type === "baseRequire" ? true : false}
			inputProps={{ maxLength: maxLengthProp }}
			InputProps={{
				endAdornment: error || !error && endIconVisible ? (
					<InputAdornment position="end">
						<ActionIcon
							id={idActionIcon}
							disableAction={disableAction}
							// action={action}
							bgcolor={
								disableAction === true
									? "rgba(0, 0, 0, 0.12)"
									: theme?.palette.primary.main
							}
							icon={icons ?? ""}
							color={
								disableAction === true
									? "red"
									: error ? "red" : "green"
							}
							pad={12.5}
							borderRadius={borderRadius}
							border={false}
						/>
					</InputAdornment>
					
				) : (<></>),
					  }} 
		/>
	</>
);