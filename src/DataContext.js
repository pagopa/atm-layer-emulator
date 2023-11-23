import { createContext, useContext, useState } from "react";

export const Ctx = createContext();

export const CtxProvider = ({ children }) => {
	const [interfaceType, setInterfaceType] = useState(true);

	const values = {
		interfaceType,
		setInterfaceType,
	};

	return <Ctx.Provider value={values}>{children}</Ctx.Provider>;
};

export const useCtx = () => useContext(Ctx);
