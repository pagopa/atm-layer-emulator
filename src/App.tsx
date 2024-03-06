import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeApp } from "./assets/jss/themeApp";
import { Ctx } from "./DataContext.js";
import PageLayout from "./pages/Layout/PageLayout";
import { HomePage } from "./pages/Layout/HomePage";
import { ScannerPage } from "./pages/ScannerPage/ScannerPage";
import { CommonErrorPage } from "./pages/ErrorPage/CommonErrorPage";
import WarningCodeInput from "./pages/WarningCodePage/WarningCodeInput";
import EcFiscalCodeInput from "./pages/EcFiscalCodePage/EcFiscalCodeInput";
import { DecodeRenderHtml } from "./components/DecodeRenderHtml/DecodeRenderHtml";
import { HomePage2 } from "./pages/Layout/HomePage2";
import routes from "./routes";


const LocalRoutes = () => (
	<Routes>
	  <Route path="/" element={<PageLayout page={<HomePage2 />} />} />
	  <Route path={routes.SCANNER_PAGE} element={<PageLayout page={<ScannerPage />} />} />
	  <Route path={routes.WARNING_CODE} element={<PageLayout page={<WarningCodeInput />} />} />
	  <Route path={routes.EC_FISCAL_CODE} element={<PageLayout page={<EcFiscalCodeInput />} />} />
	  <Route
			path={routes.ERROR_PAGE}
			element={<PageLayout page={<CommonErrorPage title={""} icon={undefined} />} /> }
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
