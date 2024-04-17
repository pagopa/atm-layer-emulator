import { Button, Grid, Typography } from "@mui/material";

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
			if (!document?.getElementById("confirm")?.classList.contains("disabled")){
				const inputElement = document.querySelector("input") as HTMLInputElement;
				const params:any = {continue:true, [inputElement.id]:inputElement.value};
				void next(params);
			}
			break;
		case "Clear":
			handleRemove(content);
			break;
		default:
			handleAdd(content);
			break;
		}
	}

	function setButtonId(content:string){
		switch (content){
		case "Canc":
			return "canc-keypad";
		case "Enter":
			return "enter-keypad";
		case "Clear":
			return "clear-keypad";
		default:
			return "btn-keypad";
		};
	};


	if (content === "") {
		return (
			<Grid item xs={3}>
				<Typography>

				</Typography>
			</Grid>
		);
	} else {
		return (
			<Button id={setButtonId(content)} variant="contained" size="large" fullWidth onClick={() => handleClick(content)}>
				<Grid container padding={"8px"}>
					<Grid item xs={12} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
						<Typography fontSize={"25px"} fontWeight={"bold"}>{content}</Typography>
					</Grid>
				</Grid>
			</Button>
		);
	}
};

export default KeyPadButton;