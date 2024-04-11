import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Ctx } from "../../DataContext";
import { HeaderApp } from "../../components/HeaderComponents/HeaderApp";
// import { Header } from "../../components/HeaderComponents/Header";
// import CustomAppBar from "../../components/Menu/CustomAppBar";


type Prop = {
	children: React.ReactNode;
};

export default function PageLayout({ children }: Prop) {
	const { logged } = useContext(Ctx);

	return (
		<Ctx.Consumer>
			{() => (
				<Box
					display={"flex"}
					flexDirection="column"
					minHeight={"100vh"}
				>
					<Box gridArea="header" sx={{ position: "sticky", top: 0, zIndex: "100" }}>
						<HeaderApp />
					</Box>
					<Box sx={{ maxHeight: "calc(100vh - 110px)", width: "100%", display: "flex" }}>
						{children}
					</Box>
				</Box>
			)}
		</Ctx.Consumer>
	);
}
