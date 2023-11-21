import { createTheme, Theme } from "@mui/material/styles";

import { deepmerge } from "@mui/utils";
import { theme } from "@pagopa/mui-italia";

const themeLocal: Theme = createTheme(theme, {
	customBox: {
		border: "1px solid " + theme.palette.primary.main,
		borderLite: "0.5px solid " + theme.palette.primary.main,
	},
	colorVariant: {
		main: "#2B2E38",
		customBorderColor: "#E8EBF1"
	},
	cardStyle: {
		border: "2px solid",
		borderColor: "lightgrey"
	}
});

declare module "@mui/material/styles" {
  // fix the type error when referencing the Theme object in your styled component
  interface Theme {
    customBox?: {
      border?: string;
      borderLite?: string;
    };
    colorVariant?: {
      main?: string;
      customBorderColor?: string;
    };
    cardStyle?: {
      border?: string;
      borderColor?: string;
    };
  }
  // fix the type error when calling `createTheme()` with a custom theme option
  interface ThemeOptions {
    customBox?: {
      border?: string;
      borderLite?: string;
    };
    colorVariant?: {
      main?: string;
      customBorderColor?: string;
    };
    cardStyle?: {
      border?: string;
      borderColor?: string;
    };
  }
}
console.log("Theme", theme);
export const themeApp = createTheme(deepmerge(theme, themeLocal));
