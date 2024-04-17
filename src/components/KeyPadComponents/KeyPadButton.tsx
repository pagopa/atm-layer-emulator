import { Button, Grid, Typography } from "@mui/material";
import KeyPadButtonIcon from "./KeyPadButtonIcon";

type Props = {
    content: string;
    handleAdd: any;
    handleRemove: any;
    next: (params: any) => Promise<void>;
};

const KeyPadButton = ( {content, handleAdd, handleRemove,  next} : Props) => {
	function handleClick(content:string){
		switch (content){
		case "Canc":
			void next({continue:false});
			break;
		case "Enter":
			void next({continue:true});
			break;
		case "Clear":
			handleRemove(content);
			break;
		default:
			handleAdd(content);
			break;
		}
	}


	switch (content) {
	case "":
		return (
			<Grid item xs={3}>
				<Typography>

				</Typography>
			</Grid>
		);
	default:
		return (
			<Button variant="contained" sx={{ backgroundColor: "#dddddd", border: "2px solid black", padding: "8px" }} size="large" id="btn-keypad" fullWidth onClick={() => handleClick(content)}>
				<Grid container padding={"8px"}>
					<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
						<Typography color={"black"} fontSize={"25px"} fontWeight={"bold"}>{content}</Typography>
					</Grid>
				</Grid>
				<KeyPadButtonIcon buttonContent={content} />
			</Button>
		);
	};
};

export default KeyPadButton;