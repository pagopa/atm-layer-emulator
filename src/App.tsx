import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { themeApp } from "./assets/jss/themeApp";
import { Ctx } from "./DataContext.js";
import routes from "./routes";
import PageLayout from "./pages/Layout/PageLayout";
import { JwtUser } from "./components/model/UserModel";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LoginPageCallback from "./pages/LoginPageCallback";
import ServiceAccessPage from "./pages/ServiceAccessPage/ServiceAccessPage";
import PrivateRoute from "./components/NavigationComponents/PrivateRoute";
import { IbanListDto, PanInfoDto } from "./components/model/ParametersModel";
import ErrorPage from "./pages/ErrorPages/ErrorPage";



const LocalRoutes = () => (
	<Routes>
		<Route element={<PrivateRoute />}>
			<Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
			<Route path={routes.SERVICE_ACCESS} element={<PageLayout><ServiceAccessPage /></PageLayout>} />
			<Route path={routes.TIMEOUT_PAGE} element={<PageLayout><ErrorPage title="Il processo ha impiegato troppo tempo per rispondere" /></PageLayout>} />
			<Route path={routes.NO_ASSOCIATION} element={<PageLayout><ErrorPage title="Non sono stati trovati processi associati al terminale selezionato" /></PageLayout>} />
			<Route path={routes.ERROR_PAGE} element={<PageLayout><ErrorPage title="Errore imprevisto di processo" /></PageLayout>} />
		</Route>
		<Route path={routes.LOGIN} element={<PageLayout><LoginPage /></PageLayout>} />
		<Route path={routes.LOGIN_BACK} element={<PageLayout><LoginPageCallback /></PageLayout>} />
	</Routes>
); 

  
function App() {
	const RELEASE_VERSION = process.env.REACT_APP_VERSION;
	const [warningCodeValue, setWarningCodeValue] = useState("");
	const [loading, setLoading] = useState(false);
	const jwt = sessionStorage.getItem("jwt_emulator");
	const debugOn = sessionStorage.getItem("debugOn");
	const [logged, setLogged] = useState(jwt ? true : false);
	const [userEmail, setUserEmail] = useState<JwtUser>({ email: undefined });
	const [responseProcess, setResponseProcess] = useState({});
	const [transactionData, setTransactionData] = useState ({});
	const abortController = new AbortController();
	const [touchInterface, setTouchInterface] = useState(true);
	const [panInfo, setPanInfo] = useState<PanInfoDto | undefined>();
	const [ibanList, setIbanList] = useState<IbanListDto | undefined>();

	function clearAll() {
		if (sessionStorage.getItem("jwt_emulator")) {
			setTokenExpired();
		}
		clearStorage();
	}

	function setTokenExpired() {
		sessionStorage.removeItem("jwt_emulator");
		setLogged(false);
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
		warningCodeValue,
		setWarningCodeValue,
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
		responseProcess,
		setResponseProcess,
		transactionData,
		setTransactionData,
		touchInterface,
		setTouchInterface,
		panInfo,
		setPanInfo,
		ibanList,
		setIbanList
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

	useEffect(() => {
		if(debugOn){
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
