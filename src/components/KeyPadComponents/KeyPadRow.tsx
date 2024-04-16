import { Grid } from "@mui/material";
import KeyPadButton from "./KeyPadButton";

type Props = {
    rowContent: Array<string>;
    handleAdd: any;
    handleRemove: any;
    next: (params: any) => Promise<void>;
};

const KeyPadRow = ({rowContent, handleAdd, handleRemove, next} : Props) => (
	<Grid container item paddingTop={1} paddingBottom={1}>
		{rowContent.map((button,i) => 
			<Grid key={i} item xs={3} paddingRight={2} >
				<KeyPadButton content={button} handleAdd={handleAdd} handleRemove={handleRemove} next={next}/>
			</Grid>)}
	</Grid>
);

export default KeyPadRow;