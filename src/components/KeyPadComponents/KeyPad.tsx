import { Box, Button, Grid, Typography } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";

type Props = {
    next: (params: any) => Promise<void>;
};

const KeyPad = ({ next }: Props) => {

	const keyPadValue = document.querySelectorAll("input") as unknown as Array<HTMLInputElement>;

	const handleAddKeyPadValue = (newValue: string) => {
		// eslint-disable-next-line functional/immutable-data
		keyPadValue[0].value = keyPadValue[0].value + newValue;
		keyPadValue[0].dispatchEvent(new Event("input"));
	};
	const handleRemoveKeyPadValue = () => {
		// eslint-disable-next-line functional/immutable-data
		keyPadValue[0].value = keyPadValue[0].value.slice(0, -1);
		keyPadValue[0].dispatchEvent(new Event("input"));
	};



	return (
		<Grid container padding={2} width="50%" display={"flex"} flexDirection={"row"} sx={{ backgroundColor: "#9c9c9c" }}>
			<Grid container item>
				<Grid item xs={3} paddingRight={2} >
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("1")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>1</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3} paddingRight={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("2")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>2</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3} paddingRight={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("3")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>3</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3} paddingRight={2} marginBottom={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => next({ continue: false })}>
						<Grid container item padding={"8px"} display={"flex"} flexDirection={"row"}>
							<Grid item xs={12} display={"flex"} justifyContent={"flex-start"}>
								<Typography color={"white"} fontSize={"16px"} sx={{ pt: 2 }}>Canc</Typography>
							</Grid>
							<Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
								<DisabledByDefaultIcon color="error" sx={{ pb: 2 }} />
							</Grid>
						</Grid>
					</Button>
				</Grid>
			</Grid>
			<Grid container item>
				<Grid item xs={3} paddingRight={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("4")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>4</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3} paddingRight={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("5")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>5</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3} paddingRight={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("6")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>6</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3} paddingRight={2} marginBottom={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleRemoveKeyPadValue()}>
						<Grid container item padding={"8px"} display={"flex"} flexDirection={"row"}>
							<Grid item xs={12} display={"flex"} justifyContent={"flex-start"}>
								<Typography color={"white"} fontSize={"16px"} sx={{ pt: 2 }}>Clear</Typography>
							</Grid>
							<Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
								<BackspaceIcon color="warning" sx={{ pb: 2 }} />
							</Grid>
						</Grid>
					</Button>
				</Grid>
			</Grid>
			<Grid container item>
				<Grid item xs={3} paddingRight={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("7")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>7</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3} paddingRight={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("8")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>8</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3} paddingRight={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("9")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>9</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3} paddingRight={2} marginBottom={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => next({ continue: true })}>
						<Grid container item padding={"8px"} display={"flex"} flexDirection={"row"}>
							<Grid item xs={12} display={"flex"} justifyContent={"flex-start"}>
								<Typography color={"white"} fontSize={"16px"} sx={{ pt: 2 }}>Enter</Typography>
							</Grid>
							<Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
								<CheckIcon color="success" sx={{ pb: 2 }} />
							</Grid>
						</Grid>
					</Button>
				</Grid>
			</Grid>
			<Grid container item>
				<Grid item xs={3}>
					<Typography>

					</Typography>
				</Grid>
				<Grid item xs={3} paddingRight={2}>
					<Button variant="contained" sx={{ backgroundColor: "#5f5f5f", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleAddKeyPadValue("0")}>
						<Grid container padding={"8px"}>
							<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
								<Typography color={"white"} fontSize={"16px"}>0</Typography>
							</Grid>
						</Grid>
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Typography>

					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Typography>

					</Typography>
				</Grid>
			</Grid>
		</Grid>

	);
};

export default KeyPad;