import { useContext, useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { themeApp } from "./assets/jss/themeApp";
import { Ctx } from "./DataContext.js";
import PageLayout from "./pages/Layout/PageLayout";
// const themeMerged = createTheme(deepmerge(theme, themeLocal));

function App() {
	const RELEASE_VERSION = process.env.REACT_APP_VERSION;

	const [interfaceType, setInterfaceType] = useState(false);
	const [loading, setLoading] = useState(false);
	
	const values = {
		interfaceType,
		setInterfaceType,
		loading,
		setLoading
	};

	useEffect(() => {
		console.log("ATM-LAYER-EMULATOR-RELEASE VERSION:", RELEASE_VERSION);
	}, []);

	return (
		<ThemeProvider theme={themeApp}>
			<Ctx.Provider value={values}>
				
				<PageLayout />
				
			</Ctx.Provider>
		</ThemeProvider>
	);
}

export default App;
