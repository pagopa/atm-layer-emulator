import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeApp } from "./assets/jss/themeApp";
import { Ctx } from "./DataContext.js";
import { HomePage } from "./pages/Layout/HomePage";
import { ScannerPage } from "./pages/ScannerPage/ScannerPage";
import { CommonErrorPage } from "./pages/ErrorPage/CommonErrorPage";
import WarningCodeInput from "./pages/WarningCodePage/WarningCodeInput";
import EcFiscalCodeInput from "./pages/EcFiscalCodePage/EcFiscalCodeInput";
import { DecodeRenderHtml } from "./components/DecodeRenderHtml/DecodeRenderHtml";
import { HomePage2 } from "./pages/Layout/HomePage2";
import routes from "./routes";
import PageLayout from "./pages/Layout/PageLayout";


const LocalRoutes = () => (
	<Routes>
		
	  <Route path="/" element={<PageLayout><HomePage2 /></PageLayout>} />
	  <Route path={routes.SCANNER_PAGE} element={<PageLayout><ScannerPage /></PageLayout>} />
	  <Route path={routes.WARNING_CODE} element={<PageLayout><WarningCodeInput /></PageLayout>} />
	  <Route path={routes.EC_FISCAL_CODE} element={<PageLayout><EcFiscalCodeInput /></PageLayout>} />
	  <Route
			path={routes.ERROR_PAGE}
			element={<PageLayout><CommonErrorPage title={""} icon={undefined} /></PageLayout> }
	  />
	  
	</Routes>
);
  
function App() {
	const RELEASE_VERSION = process.env.REACT_APP_VERSION;
  
	const [interfaceType, setInterfaceType] = useState(false);
	const [warningCodeValue, setWarningCodeValue] = useState("");
	const [ecFiscalCodeValue, setEcFiscalCodeValue] = useState("");
	const [loading, setLoading] = useState(false);
  
	const values = {
	  interfaceType,
	  setInterfaceType,
	  warningCodeValue,
	  setWarningCodeValue,
	  ecFiscalCodeValue,
	  setEcFiscalCodeValue,
	  loading,
	  setLoading,
	};
  
	useEffect(() => {
	  console.log("ATM-LAYER-EMULATOR-RELEASE VERSION:", RELEASE_VERSION);
	}, []);
  
	return (
	  <ThemeProvider theme={themeApp}>
			<Ctx.Provider value={values}>
				<BrowserRouter>
					{LocalRoutes()}
		  		</BrowserRouter>
			</Ctx.Provider>
	  </ThemeProvider>
	);
}
  
export default App;
