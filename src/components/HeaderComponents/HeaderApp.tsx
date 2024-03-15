import { LogoPagoPACompany } from "@pagopa/mui-italia";
import { useContext } from "react";
import { Ctx } from "../../DataContext";
import { HeaderAccountCustom } from "./HeaderAccountCustom";


export const HeaderApp = () => {
	const { logged, clearAll } = useContext(Ctx);


	const handleLogout = () => {
		clearAll();
	};

	return (
		<HeaderAccountCustom
			onLogout={handleLogout}
			loggedUser={logged}
			rootLink={{
				element: <LogoPagoPACompany color="default" variant="default" />,
				// href: "https://www.pagopa.gov.it/",
				ariaLabel: "PagoPA",
				title: "PagoPA-logo"

			}}
		/>
	);
};