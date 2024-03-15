import { Container, Button, Stack, Typography, Box, useTheme } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { RootLinkType } from "../model/UserModel";
import { USER_EMAIL } from "../../commons/endpoints";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import IconBox from "../Commons/IconBox";
import ROUTES from "../../routes";

type HeaderAccountProps = {
	rootLink: RootLinkType;
	loggedUser?: boolean;
	onLogout?: () => void;
};

export const HeaderAccountCustom = ({
	rootLink,
	loggedUser,
	onLogout
}: HeaderAccountProps) => {

	const { userEmail, setUserEmail, abortController } = useContext(Ctx);

	const token = sessionStorage.getItem("jwt_console");
	const navigate = useNavigate();
	const theme = useTheme();

	const getTokenEmail = async () => {
		try {
			const response = await fetchRequest({ urlEndpoint: USER_EMAIL, method: "GET", abortController })();

			if (response?.success) {
				setUserEmail({ email: response?.valuesObj.email });
			}
		} catch (error) {
			console.error("ERROR", error);
		}
	};

	useEffect(() => {
		if(!userEmail.email && token){
			void getTokenEmail();
		}
	}, []);

	return (
		<Stack
			component="div"
			justifyContent="center"
			sx={{
				borderBottom: 1,
				borderColor: "divider",
				backgroundColor: "background.paper",
				minHeight: "40px",
			}}
		>
			<Container maxWidth={false}>
				<Stack
					spacing={2}
					direction="row"
					// justifyContent="space-between"
					alignItems="center"
				>
					<Box pl={3} className="logo" aria-label={rootLink?.ariaLabel} title={rootLink?.title} display={"flex"} flexDirection={"row"} alignItems={"center"}>
						{rootLink?.element}
					</Box>
					<Box pl={2} mb={2} className="home" aria-label={"buttonHome"} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-start"}>
						{/* <Button variant="text" size="medium" >Text</Button> */}
						{/* <ActionIcon icon={"Launch"} color={theme.palette.text.primary} pad={1.5} size={"1em"}  /> */}
						<Button
							variant="text"
							size="large"
							onClick={()=>navigate(ROUTES.HOME)}
							sx={{
								padding: "0px 0px 0px 8px",
								fontSize:"1.5em",
								marginBottom: "5px",
								// color: theme.palette.text.primary,
								"&:hover": {
									backgroundColor: "transparent",
									textDecoration:"underline"
								},
							}}
							startIcon={<IconBox icon={"HomeOutlined"} color={theme.palette.primary.main} pad={0.5} size={"1em"} marg={"5px 0px 0px 0px"} />}
						>
		Home
							
						</Button>
					</Box>

					<Stack
						direction="row"
						alignItems="center"
						spacing={{ xs: 1, sm: 3, md: 4 }}
					>
						{/* DIFFERENT COMBINATIONS */}

						{/* 1. Logged User with Dropdown */}
						{loggedUser && (
							// <AccountDropdown user={loggedUser} />
							<Box display={"flex"} >
								<Box mr={1}>
									<AccountCircleRoundedIcon />
								</Box>
								<Typography>
									{userEmail.email ?? "Benvenuto utente"}
								</Typography>
							</Box>
						)}

						{/* 2. Logged User */}
						{loggedUser && (
							<Button variant="outlined" onClick={onLogout} title="Esci" data-testid="exit-button-test">
								Esci
							</Button>
						)}

					</Stack>
				</Stack>
			</Container>
		</Stack>
	);
};