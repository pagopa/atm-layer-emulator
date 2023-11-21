import { useContext, useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Ctx } from "./DataContext";
import { HomePage } from "./components/Layout/HomePage";
import { themeApp } from "./assets/jss/themeApp";


// const themeMerged = createTheme(deepmerge(theme, themeLocal));

function App() {
	const context = useContext(Ctx);
	const RELEASE_VERSION = process.env.REACT_APP_VERSION;

	useEffect(() => {
		console.log("ATM-LAYER-WEB-CONSOLE RELEASE VERSION:", RELEASE_VERSION);
	}, []);

	return (
		<ThemeProvider theme={themeApp}>
			<Ctx.Consumer>
				{() => (
					<HomePage />
				)}
			</Ctx.Consumer>
		</ThemeProvider>
	);
}

export default App;
