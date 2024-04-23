import { Grid } from "@mui/material";
import KeyPadButton from "./KeyPadButton";

type Props = {
    rowContent: Array<string>;
    handleAdd: any;
    handleRemove: any;
    next: (params: any) => Promise<void>;
	type: string;
};

const KeyPadRow = ({rowContent, handleAdd, handleRemove, next, type} : Props) => (
	<Grid container item paddingTop={1} paddingBottom={1} spacing={2}>
		{rowContent.map((button,i) => 
			<Grid key={i} item xs={3} >
				<KeyPadButton content={button} handleAdd={handleAdd} handleRemove={handleRemove} next={next} type={type}/>
			</Grid>)}
	</Grid>
);

export default KeyPadRow;