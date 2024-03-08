import { createTheme, Theme, alpha } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

/* Typefaces */
/* -- Titilium */
import "@fontsource/titillium-web/300.css";
import "@fontsource/titillium-web/400.css";
import "@fontsource/titillium-web/600.css";
import "@fontsource/titillium-web/700.css";
/* -- DM Mono */
import "@fontsource/dm-mono/400.css";
// import { lineHeight } from "@mui/system";

export function pxToRem(value: number): string {
	return `${value / 16}rem`;
}

/* Basic Configuration */
const mainTypeface = ["\"Titillium Web\"", "sans-serif"].join(", ");
const monospacedTypeface = ["\"DM Mono\"", "monospace"].join(", ");
const colorTextPrimary = "#171717";
const colorPrimary = "#00A1B0";
const lightGrey = "#DFDFDF";
const alertBorderWidth = "4px";
const responsiveBreakpoint = "sm";
const colorPrimaryContainedHover = "#EBFDFF"; // Not exposed by the theme object
export const ringWidth = "4px";
const shadowColor = "#002B55";

const shadowValues = {
	/* Elevation 4 */
	4: `0px 2px 4px -1px ${alpha(shadowColor, 0.1)},
      0px 4px 5px ${alpha(shadowColor, 0.05)},
      0px 1px 10px ${alpha(shadowColor, 0.1)}`,
	/* Elevation 8 */
	8: `0 2px 10px -5px  ${alpha(shadowColor, 0.1)},
	0px 4px 3px ${alpha(shadowColor, 0.05)},
	0px 1px 10px  ${alpha(shadowColor, 0.1)}`,
	/* Elevation 16 */
	16: `0px 8px 10px -5px ${alpha(shadowColor, 0.1)},
       0px 16px 24px 2px ${alpha(shadowColor, 0.05)},
       0px 6px 30px 5px ${alpha(shadowColor, 0.1)}`,
};

// eslint-disable-next-line functional/immutable-data
const shadowsArray = Array(25).fill("none") as any;

/* Custom Typography */
declare module "@mui/material/styles" {
	interface TypographyVariants {
		headline: React.CSSProperties;
		sidenav: React.CSSProperties;
		monospaced: React.CSSProperties;
		"caption-semibold": React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		headline?: React.CSSProperties;
		sidenav?: React.CSSProperties;
		monospaced?: React.CSSProperties;
		"caption-semibold"?: React.CSSProperties;
	}

}


declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		headline: true;
		sidenav: true;
		monospaced: true;
		"caption-semibold": true;
	}
}

/* Custom Palette */
declare module "@mui/material/styles" {
	interface Palette {
		pagoPA: Palette["primary"];
		europeanUnion: Palette["primary"];
		checkIban: Palette["primary"];
		extraLight: Palette["warning"];
		primaryAction: Palette["action"];
		normal: Palette["primary"];
	}
	interface PaletteOptions {
		pagoPA?: PaletteOptions["primary"];
		europeanUnion: PaletteOptions["primary"];
		checkIban?: PaletteOptions["primary"];
		extraLight?: PaletteOptions["warning"];
		primaryAction: PaletteOptions["action"];
		normal: Palette["primary"];
	}

	interface PaletteColor {
		extraLight?: string;
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		manual: true;
	}
}

declare module "@mui/material/Button" {
	interface CustomButtonProps {
		CustomButton: "root";
	}
}


const foundation: Theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	mixins: {
		toolbar: {
			minHeight: 120,
		},
	},
	palette: {
		mode: "light",
		background: {
			paper: "#FFFFFF",
			default: "#F2F2F2",
		},
		primary: {
			main: colorPrimary,
			light: "#EBFDFF",
			dark: "#00707B",
			contrastText: "#fff",
		},
		secondary: {
			main: "#0073E6",
			light: "#2185E9",
			dark: "#0062C3",
			contrastText: "#FFFFFF"
		},
		pagoPA: {
			main: "#0066CC",
			contrastText: "#fff",
		},
		checkIban: {
			main: "#008CA8",
			contrastText: "#fff",
		},
		europeanUnion: {
			main: "#264CA4",
			contrastText: "#fff",
		},
		indigo: {
			main: indigo[500],
			contrastText: "#fff",
		},
		negative: {
			main: "#FFFFFF",
			contrastText: colorPrimary,
		},
		normal: {
			main: colorPrimary,
			contrastText: colorPrimary,
			light: "#EBFDFF",
			dark: "#00707B",
		},
		text: {
			primary: colorTextPrimary,
			secondary: colorPrimary,
			disabled: "#97a1b5",
		},
		action: {
			active: "rgba(0, 0, 0, 0.54)" /* Text/Secondary */,
			hover: "rgba(0, 161, 176, 0.08)" /* Text/Primary 8% */,
			hoverOpacity: 0.08,
			selected: "rgba(0, 161, 176, 0.12)" /* Text/Primary 12% */,
			disabled: "rgba(0, 161, 176, 0.26)"   /* Text/Primary 26% */,
			disabledBackground: "rgba(0, 161, 176, 0.12)" /* Text/Primary 12% */,
			focus: "rgba(0, 161, 176, 0.12)" /* Text/Primary 12% */,
		},
		primaryAction: {
			hover: "rgba(0, 161, 176, 0.12)" /* Primary 12% */,
			selected: "rgba(0, 161, 176, 0.08)" /* Primary 8% */,
		},
		/* Other */
		divider: "#DFE3EB",
		/* Indicator/Validation */
		error: { // TODO: lasciato quello del tema originale
			main: "#FE6666",
			dark: "#D85757",
			light: "#FE7A7A",
			extraLight: "#FB9EAC",
			contrastText: colorTextPrimary,
		},
		info: {  // TODO: lasciato quello del tema originale
			main: "#6BCFFB",
			dark: "#5BB0D5",
			light: "#7ED5FC", // TODO: qui andrebbe "#caf2f5"
			extraLight: "#86E1FD",
			contrastText: colorTextPrimary,
		},
		success: {  // TODO: lasciato quello del tema originale
			main: "#6CC66A",
			dark: "#5CA85A",
			light: "#7FCD7D",
			extraLight: "#B5E2B4",
			contrastText: colorTextPrimary,
		},
		warning: { // TODO: lasciato quello del tema originale
			main: "#FFCB46",
			dark: "#D9AD3C",
			light: "#FFD25E",
			extraLight: "#FFE5A3",
			contrastText: colorTextPrimary,
		},
	},
	typography: {
		/* Using a constant because type variants
	don't inherit the typeface general color */
		allVariants: {
			color: colorTextPrimary,
		},
		/* Using a constant because type variants
	don't inherit the typeface font family */
		fontFamily: mainTypeface,
		fontWeightRegular: 400,
		fontWeightMedium: 600 /* Semibold */,
		fontWeightBold: 700,
		fontSize: 16,
		htmlFontSize: 16,
	},
	shadows: { ...shadowsArray, ...shadowValues },
	shape: {
		borderRadius: 0,
	},
	spacing: 8,
	// customBox: {
	// 	border: "1px solid #DFE3EB",
	// 	borderLite: "0.5px solid #DFE3EB"
	// },
});

export const themeApp: Theme = createTheme(foundation, {
	typography: {
		/* H1 Large */
		headline: {
			fontSize: pxToRem(58),
			fontFamily: mainTypeface,
			color: colorTextPrimary,
			// lineHeight: 1.1 /* ~64px */, // TODO: tolto da quello del tema originale
			fontWeight: foundation.typography.fontWeightBold,
		},
		h1: {
			fontSize: pxToRem(42),
			// lineHeight: 1.1 /* 46px */,// TODO: tolto da quello del tema originale
			fontWeight: foundation.typography.fontWeightBold,
			[foundation.breakpoints.up(responsiveBreakpoint)]: {
				fontSize: pxToRem(50),
				// lineHeight: 1.08 /* 54px */,// TODO: tolto da quello del tema originale
			},
		},
		h2: {
			fontSize: pxToRem(36),
			// lineHeight: 1.1 /* ~40px */,// TODO: tolto da quello del tema originale
			fontWeight: foundation.typography.fontWeightBold,
			[foundation.breakpoints.up(responsiveBreakpoint)]: {
				fontSize: pxToRem(44),
				// lineHeight: 1.09 /* ~48px */,// TODO: tolto da quello del tema originale
			},
		},
		h3: {
			fontSize: pxToRem(32),
			// lineHeight: 1.125 /* 36px */, // TODO: tolto da quello del tema originale
			fontWeight: foundation.typography.fontWeightBold,
			[foundation.breakpoints.up(responsiveBreakpoint)]: {
				fontSize: pxToRem(38),
				// lineHeight: 1.1 /* ~42px */, // TODO: tolto da quello del tema originale
			},
		},
		h4: {
			fontSize: pxToRem(28),
			// lineHeight: 1.15 /* ~32px */, // TODO: tolto da quello del tema originale
			fontWeight: foundation.typography?.fontWeightBold,
			[foundation.breakpoints.up(responsiveBreakpoint)]: {
				fontSize: pxToRem(32),
				// lineHeight: 1.125 /* 36px */, // TODO: tolto da quello del tema originale
			},
		},
		h5: {
			fontSize: pxToRem(24),
			// lineHeight: 1.15 /* ~28px */, // TODO: tolto da quello del tema originale
			fontWeight: foundation.typography.fontWeightBold,
			[foundation.breakpoints.up(responsiveBreakpoint)]: {
				fontSize: pxToRem(28),
				// lineHeight: 1.5 /* 42px */, // TODO: tolto da quello del tema originale
			},
		},
		h6: {
			fontSize: pxToRem(22),
			// lineHeight: 1.18 /* ~26px */, // TODO: tolto da quello del tema originale
			fontWeight: foundation.typography.fontWeightRegular,
			[foundation.breakpoints.up(responsiveBreakpoint)]: {
				fontSize: pxToRem(24),
				// lineHeight: 1.15 /* ~28px */, // TODO: tolto da quello del tema originale
			},
		},
		sidenav: {
			fontFamily: mainTypeface,
			fontSize: pxToRem(22),
			// lineHeight: 1.35 /* ~24px */, // TODO: tolto da quello del tema originale
			color: colorTextPrimary,
			fontWeight: foundation.typography.fontWeightMedium,
		},
		body1: {
			fontSize: pxToRem(18),
			// lineHeight: 1.5 /* ~28px */, // TODO: tolto da quello del tema originale
			fontWeight: foundation.typography.fontWeightRegular,
			letterSpacing: 0,
			/* a: {
	color: italia[500],
	textDecoration: "underline",
  }, */
		},
		body2: {
			fontSize: pxToRem(18),
			// lineHeight: 1.4 /* ~20px */, // TODO: tolto da quello del tema originale
			fontWeight: foundation.typography.fontWeightMedium,
			letterSpacing: 0.15,
		},
		button: {
			// lineHeight: 1.2, // TODO: tolto da quello del tema originale
			textTransform: "none",
			letterSpacing: 0,
		},
		caption: {
			fontSize: pxToRem(14),
			// lineHeight: 1.4 /* ~20px */ // TODO: tolto da quello del tema originale,
			fontWeight: foundation.typography.fontWeightRegular,
		},
		"caption-semibold": {
			fontFamily: mainTypeface,
			fontSize: pxToRem(14),
			// lineHeight: 1.4 /* ~20px */, // TODO: tolto da quello del tema originale
			color: colorTextPrimary,
			fontWeight: foundation.typography.fontWeightMedium,
		},
		monospaced: {
			fontFamily: monospacedTypeface,
			fontSize: pxToRem(16),
			// lineHeight: 1.4 /* ~22px */, // TODO: tolto da quello del tema originale
			color: colorTextPrimary,
			letterSpacing: "0.15px",
			fontWeight: foundation.typography.fontWeightRegular,
		},
		overline: {
			fontSize: pxToRem(14),
			// lineHeight: 1.15 /* ~16px */, // TODO: tolto da quello del tema originale
			fontWeight: foundation.typography.fontWeightBold,
			letterSpacing: 1,
		},

		/* Start: To be revised */
		subtitle1: {
			fontSize: pxToRem(14),
			fontWeight: foundation.typography.fontWeightRegular,
		},
		subtitle2: {
			fontSize: pxToRem(14),
			fontWeight: foundation.typography.fontWeightMedium,
		},
		/* End: To be revised */
	},
	components: {
		/* START Button */
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				disableFocusRipple: true,
			},
			styleOverrides: {
				root: {
					padding: "0 20px",
					"&.Mui-focusVisible": {
						boxShadow: `0 0 0 ${ringWidth} ${alpha(
							foundation.palette.primary.main,
							0.4
						)}`,
					},
				},
				sizeSmall: {
					height: "40px",
					padding: "0 20px",
					fontSize: pxToRem(14),
					lineHeight: 1.25 /* ~18px */,
				},
				sizeMedium: {
					height: "48px",
					padding: "0 24px",
					fontSize: pxToRem(16),
					lineHeight: 1.25 /* 20px */,
				},
				sizeLarge: {
					height: "56px",
					padding: "0 24px",
					fontSize: pxToRem(18),
					lineHeight: 1.2 /* ~22px */,
				},
				outlined: {
					borderWidth: "2px",
					"&:hover": {
						borderWidth: "2px",
					},
					"&:disabled": {
						borderWidth: "2px",
					},
				},
				outlinedPrimary: {
					borderColor: foundation.palette.primary.main,
					"&:hover": {
						color: foundation.palette.primary.dark,
						borderColor: "currentColor",
					},
				},
				outlinedError: {
					borderColor: foundation.palette.error.main,
					"&:hover": {
						color: foundation.palette.error.dark,
						borderColor: "currentColor",
					},
					"&.Mui-focusVisible": {
						boxShadow: `0 0 0 ${ringWidth} ${alpha(
							foundation.palette.error.main,
							0.4
						)}`,
					},
				},
			},
			variants: [
				{
					props: { variant: "naked" },
					style: {
						color: foundation.palette.text.primary,
						padding: 0,
						height: "auto",
						minWidth: "auto",
						"&:hover": {
							color: alpha(foundation.palette.text.primary, 0.8),
							backgroundColor: "transparent",
						},
						"&.Mui-focusVisible": {
							boxShadow: `0 0 0 3px ${alpha(
								foundation.palette.text.primary,
								0.2
							)}`,
						},
					},
				},
				{
					props: { variant: "naked", color: "primary" },
					style: {
						color: foundation.palette.primary.main,
						"&:hover": {
							color: alpha(foundation.palette.primary.main, 0.8),
							backgroundColor: "transparent",
						},
						"&.Mui-focusVisible": {
							boxShadow: `0 0 0 3px ${alpha(
								foundation.palette.text.primary,
								0.35
							)}`,
						},
					},
				},
				{
					props: { variant: "naked", color: "error" },
					style: {
						color: foundation.palette.error.main,
						"&:hover": {
							color: foundation.palette.error.light,
						},
						"&.Mui-focusVisible": {
							boxShadow: `0 0 0 3px ${alpha(
								foundation.palette.error.main,
								0.35
							)}`,
						},
					},
				},
				{
					props: { variant: "text", color: "normal" },
					style: {
						color: foundation.palette.text.primary,
						"&:hover": {
							color: alpha(foundation.palette.text.primary, 0.8),
						},
						"&.Mui-focusVisible": {
							boxShadow: `0 0 0 3px ${alpha(
								foundation.palette.text.primary,
								0.2
							)}`,
						},
					},
				},
				{
					props: { variant: "text", color: "negative" },
					style: {

						color: foundation.palette.primary.contrastText,
						"&:hover": {
							// padding: "0 20px 0 24px",
							// color: alpha(foundation.palette.text.primary, 0.8),
							backgroundColor: alpha(foundation.palette.primary.light, 0.3),
						},

						"&.Mui-focusVisible": {
							boxShadow: `0 0 0 3px ${alpha(
								foundation.palette.text.primary,
								0.2
							)}`,
						},
					},
				},
				{
					props: { variant: "manual" },
					style: {
						fontSize: foundation.typography.pxToRem(12),
						height: "100%",
						width: "100%",
						color: "black",
						display: "flex",
						alignItems: "center",
						minHeight: foundation.spacing(8.5),
						borderWidth: "2px",
						border: "2px solid" + lightGrey,
						"&:hover": {
							borderWidth: "2px",
						},
						"&:disabled": {
							borderWidth: "2px",
						},
						"&.Mui-focusVisible": {
							boxShadow: `0 0 0 3px ${alpha(
								foundation.palette.error.main,
								0.35
							)}`,
						},
					},
				},
			],
		},
		MuiInput: {
			styleOverrides: {
				root: {
					fontWeight: foundation.typography.fontWeightRegular,
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					fontWeight: foundation.typography.fontWeightRegular,
					"& .MuiOutlinedInput-notchedOutline": {},
					"&.Mui-error .MuiOutlinedInput-notchedOutline": {
						borderColor: foundation.palette.error.dark,
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: foundation.palette.text.primary,
					fontWeight: foundation.typography.fontWeightRegular,
					"&.Mui-error": {
						color: foundation.palette.error.dark,
					},
				},
			},
		},
		MuiInputAdornment: {
			styleOverrides: {
				root: {
					"& .MuiSvgIcon-colorError": {
						color: `${foundation.palette.error.dark}`,
					},
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontSize: pxToRem(12),
					lineHeight: 1.25 /* 15px */,
					color: foundation.palette.text.secondary,
					fontWeight: foundation.typography.fontWeightMedium,
					letterSpacing: 0.5,
					"&.Mui-error": {
						color: foundation.palette.error.dark,
					},
				},
			},
		},
		MuiDialogContentText: {
			styleOverrides: {
				root: {
					color: foundation.palette.text.primary
				},
			},
		},
		/* START Alert */
		MuiAlert: {
			styleOverrides: {
			  root: {
					borderLeft: `${alertBorderWidth} solid`,
					padding: foundation.spacing(1),
					// color: "inherit",
					alignItems: "center",
					[foundation.breakpoints.up(responsiveBreakpoint)]: {
				 		padding: foundation.spacing(2),
					},
			  },
			  icon: {
					opacity: 1,
					padding: 0,
					alignItems: "center",
					marginRight: foundation.spacing(1),
					[foundation.breakpoints.up(responsiveBreakpoint)]: {
						marginRight: foundation.spacing(2),
					},
			  },
			  message: {
					padding: 0,
					overflow: "inherit", // Fix overflow: auto bug introduced by MUI
			  },
			  action: {
					marginRight: 0,
					paddingTop: 0,
			  },
			  outlined: {
					backgroundColor: foundation.palette.common.white,
					boxShadow: foundation.shadows[4],
					borderWidth: `0 0 0 ${alertBorderWidth}`,
			  },

			  standardSuccess: {
					borderColor: foundation.palette.success.main,
					"& .MuiAlertTitle-root":{
						color:foundation.palette.success.main,
						// fontSize: pxToRem(18),
					}
			  },
			  outlinedSuccess: {
					borderColor: foundation.palette.success.main,
					"& .MuiAlert-icon": {
				  		color: foundation.palette.success.main,
					},
			  },
			  standardError: {
					borderColor: foundation.palette.error.main,
					"& .MuiAlertTitle-root":{
						color:foundation.palette.error.main,
						// fontSize: pxToRem(18),
					}
			  },
			  outlinedError: {
					borderColor: foundation.palette.error.main,
					"& .MuiAlert-icon": {
				  		color: foundation.palette.error.main,
					},
			  },
			  standardInfo: {
					borderColor: foundation.palette.info.main,
					"& .MuiAlertTitle-root":{
						color:foundation.palette.info.main,
						// fontSize: pxToRem(18),
					}
			  },
			  outlinedInfo: {
					borderColor: foundation.palette.info.main,
					"& .MuiAlert-icon": {
				 		color: foundation.palette.info.main,
					},
			  },
			  standardWarning: {
					borderColor: foundation.palette.warning.main,
					"& .MuiAlertTitle-root":{
						color:foundation.palette.warning.main,
						// fontSize: pxToRem(18),
					}
			  },
			  outlinedWarning: {
					borderColor: foundation.palette.warning.main,
					"& .MuiAlert-icon": {
				 		color: foundation.palette.warning.main,
					},
			  },
			},
		  },
		  MuiAlertTitle: {
			styleOverrides: {
			  root: {
					fontSize: pxToRem(18) +"!important",
					fontWeight: foundation.typography.fontWeightMedium,
					letterSpacing: 0.15,
					margin: 0,
					/* It inherits from `body1`, so I have to reset -_- */
					[foundation.breakpoints.up(responsiveBreakpoint)]: {
				 		fontSize: pxToRem(16),
					},
			  },
			},
		  }
		  /* END Alert */
	  

	}
	
});

export const themeButton = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: foundation.typography.pxToRem(12),
					height: "100%",
					width: "100%",
					color: "black",
					display: "flex",
					alignItems: "center",
					minHeight: foundation.spacing(8.5),
					borderWidth: "2px",
					border: "2px solid " + lightGrey,
					"&:hover": {
						borderWidth: "2px",
					},
					"&:disabled": {
						borderWidth: "2px",
					},
					"&.Mui-focusVisible": {
						boxShadow: `0 0 0 3px ${alpha(
							foundation.palette.error.main,
							0.35
						)}`,
					},
				}
			},
		},
	},
});