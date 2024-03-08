import { Container, Button, Stack, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box } from "@mui/system";
import { useContext } from "react";
import { Ctx } from "../../DataContext";
import { RootLinkType } from "../model/UserModel";

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

	const { userEmail } = useContext(Ctx);

	return (
		<Stack
			component="div"
			justifyContent="center"
			sx={{
				borderBottom: 1,
				borderColor: "divider",
				backgroundColor: "background.paper",
				minHeight: "60px",
			}}
		>
			<Container maxWidth={false}>
				<Stack
					spacing={2}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box pl={3} className="logo" aria-label={rootLink?.ariaLabel} title={rootLink?.title} display={"flex"} flexDirection={"row"} alignItems={"center"}>
						{rootLink?.element}
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