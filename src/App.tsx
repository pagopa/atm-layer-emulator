import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { themeApp } from "./assets/jss/themeApp";
import { Ctx } from "./DataContext.js";
import { ScannerPage } from "./pages/ScannerPage/ScannerPage";
import { CommonErrorPage } from "./pages/ErrorPage/CommonErrorPage";
import WarningCodeInput from "./pages/WarningCodePage/WarningCodeInput";
import EcFiscalCodeInput from "./pages/EcFiscalCodePage/EcFiscalCodeInput";
import routes from "./routes";
import PageLayout from "./pages/Layout/PageLayout";
import { JwtUser } from "./components/model/UserModel";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LoginPageCallback from "./pages/LoginPageCallback";


const LocalRoutes = () => (
	<Routes>

		<Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
		<Route path={routes.HOME} element={<PageLayout><HomePage /></PageLayout>} />
		<Route path={routes.SCANNER_PAGE} element={<PageLayout><ScannerPage /></PageLayout>} />
		<Route path={routes.WARNING_CODE} element={<PageLayout><WarningCodeInput /></PageLayout>} />
		<Route path={routes.EC_FISCAL_CODE} element={<PageLayout><EcFiscalCodeInput /></PageLayout>} />
		<Route
			path={routes.ERROR_PAGE}
			element={<PageLayout><CommonErrorPage title={""} icon={undefined} /></PageLayout>}
		/>
		<Route path={routes.LOGIN} element={<PageLayout><LoginPage /></PageLayout>} />
		<Route path={routes.LOGIN_BACK} element={<PageLayout><LoginPageCallback /></PageLayout>} />

	</Routes>
);

function App() {
	const RELEASE_VERSION = process.env.REACT_APP_VERSION;

	const [interfaceType, setInterfaceType] = useState(false);
	const [warningCodeValue, setWarningCodeValue] = useState("");
	const [ecFiscalCodeValue, setEcFiscalCodeValue] = useState("");
	const [loading, setLoading] = useState(false);
	const temp = localStorage.getItem("tempLog");
	const jwt = localStorage.getItem("jwt_emulator");
	const debugOn = sessionStorage.getItem("debugOn");
	const [logged, setLogged] = useState(temp || jwt ? true : false);
	const [userEmail, setUserEmail] = useState<JwtUser>({ email: undefined });
	const abortController = new AbortController();

	function clearAll() {
		if (localStorage.getItem("jwt_emulator")) {
			setTokenExpired();
		}
		clearStorage();
	}

	function setTokenExpired() {
		localStorage.removeItem("jwt_emulator");
		setLogged(false);
		// navigate(ROUTES.LOGIN);
	}

	function clearStorage() {
		if (sessionStorage.getItem("recordParams")) {
			sessionStorage.removeItem("recordParams");
		}
		if (sessionStorage.getItem("recordParamsAssociated")) {
			sessionStorage.removeItem("recordParamsAssociated");
		}
	}

	const values = {
		interfaceType,
		setInterfaceType,
		warningCodeValue,
		setWarningCodeValue,
		ecFiscalCodeValue,
		setEcFiscalCodeValue,
		loading,
		setLoading,
		clearAll,
		setTokenExpired,
		logged,
		setLogged,
		userEmail,
		setUserEmail,
		abortController,
		debugOn,
		clearStorage,
	};

	useEffect(() => {
		if (debugOn) {
			console.log("ATM-LAYER-EMULATOR-RELEASE VERSION:", RELEASE_VERSION);
		}
	}, []);

	useEffect(() => {
		if (debugOn) {
			console.log("login utente", logged);
		}
	}, [logged]);

	return (
		<ThemeProvider theme={themeApp}>
			<Ctx.Provider value={values}>
				{LocalRoutes()}
			</Ctx.Provider>
		</ThemeProvider>
	);
}

export default App;
