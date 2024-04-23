import { Button, Grid, Typography } from "@mui/material";

type Props = {
    content: string;
    handleAdd: any;
    handleRemove: any;
    next: (params: any) => Promise<void>;
	type: string;
};

const KeyPadButton = ( {content, handleAdd, handleRemove,  next, type} : Props) => {
	function handleClick(content:string){
		switch (content){
		case "Canc":
			void next({continue:false});
			break;
		case "Enter":
			if (!document?.getElementById("confirm")?.classList.contains("disabled")){
				const inputElement = document.querySelector("input") as HTMLInputElement;
				if(inputElement) {
					const params:any = {continue:true, [inputElement.id]:inputElement.value};
					void next(params);
				} else {
					void next({"continue": true});
				}
				
			}
			break;
		case "Clear":
			if(type === "FORM") {
				handleRemove(content);
			}
			break;
		default:
			if(type === "FORM") {
				handleAdd(content);
			}
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