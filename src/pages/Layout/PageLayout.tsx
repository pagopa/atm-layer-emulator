import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Ctx } from "../../DataContext";
// import { Header } from "../../components/HeaderComponents/Header";
// import CustomAppBar from "../../components/Menu/CustomAppBar";


type Prop= {
	children: React.ReactNode;
};

export default function PageLayout({ children }: Prop) {
	const { logged } = useContext(Ctx);

	return (
		<Ctx.Consumer>
			{() => (
				<Box
					display={"flex"}
					flexDirection= "column"
					minHeight={"100vh"}
				>
					<Box gridArea="header" sx={{ position: "sticky", top: 0, zIndex: "100" }}>
						{/* <Header  data-testid="header-id" />
						{logged===true&&<CustomAppBar data-testid="customAppBar-id" />} */}
					</Box>
					<Box sx={{maxHeight:"calc(100vh - 110px)", overflowY:"auto", width:"100%"}}>
						{children}
					</Box>
				</Box>
			)}
		</Ctx.Consumer>
	);
}
