import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../DataContext";
import routes from "../routes";

import { Loading } from "../components/Commons/Loading";


const LoginPageCallback = () => {
	const { setLogged } = useContext(Ctx);
	const navigate = useNavigate();


	useEffect(() => {
		const token = window?.location?.hash?.split("&")[1]?.split("=")[1];
		if (token) {
			setLogged(true);
			sessionStorage.setItem("jwt_emulator", token);
			navigate(routes.HOME);
		} else {
			navigate(routes.LOGIN);
		}
	}, []);

	return(
		<Loading />
	);
};

export default LoginPageCallback;