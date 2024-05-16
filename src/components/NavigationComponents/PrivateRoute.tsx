import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import routes from "../../routes";
import { Ctx } from "../../DataContext";


const PrivateRoutes = () => {
	const navigate = useNavigate();
	const { logged } = useContext(Ctx);
  
	useEffect(() => {
		if (logged===false) {
			navigate(routes.LOGIN);
		}
	}, [logged, navigate]);
  
	return <Outlet />;
};
  
export default PrivateRoutes;
