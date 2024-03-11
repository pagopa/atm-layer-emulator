import { Box, Grid } from "@mui/material";
// import HomeCardComponent from "../components/CardComponents/HomeCardComponent";
// import { homePageCard } from "../utils/homePageCard";
import { HomePageTitle } from "../components/TitleComponents/HomePageTitle";
import FormEmulatorParameters from "../components/FormComponents/FormEmulatorParameters";
import BoxPageLayout from "./Layout/BoxPageLayout";



export default function HomePage() {
	return (
		<BoxPageLayout px={15}>
			<Grid container spacing={0.5}>
				<HomePageTitle
					title={"Emulator"}
					subTitle={"Strumento per simulare il comportamento delle risorse"}
				/>

			</Grid>
			<Box my="2%" alignContent={"center"} >
				<Grid display={"flex"} justifyContent={"center"}>
					{/* {
						homePageCard.filter(el=> el.id!=="home").map((e, i) => (
							<Grid item xs={4} mx={"auto"} key={e.title}>
								<HomeCardComponent
									title={e.title}
									description={e.description}
									icon={e.icon}
									pageLink={e.pageLink}
								/>
							</Grid>
						))
					} */}
					<FormEmulatorParameters />
				</Grid>
			</Box>
		</BoxPageLayout>
	);
};