import { Box, Grid } from "@mui/material";
// import HomeCardComponent from "../components/CardComponents/HomeCardComponent";
// import { homePageCard } from "../utils/homePageCard";
import { HomePageTitle } from "../components/TitleComponents/HomePageTitle";
import FormEmulatorParameters from "../components/FormComponents/FormEmulatorParameters";
import BoxPageLayout from "./Layout/BoxPageLayout";



export default function HomePage() {
	return (
		<BoxPageLayout px={20}>
			<Grid container spacing={0.5}>
				<HomePageTitle
					title={"Emulator"}
					subTitle={"Strumento per simulare il comportamento delle risorse"}
				/>

			</Grid>
			<Box my="2%" alignContent={"center"} >
				<Grid display={"flex"} justifyContent={"center"}>
					<FormEmulatorParameters />
				</Grid>
			</Box>
		</BoxPageLayout>
	);
};