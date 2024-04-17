import { Grid } from "@mui/material";
import KeyPadRow from "./KeyPadRow";

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
		<Grid container id="keyPad" padding={2} width="380px" display={"flex"} flexDirection={"row"} sx={{ backgroundColor: "#cccccc", border:"2px solid black"}}>
			<KeyPadRow rowContent={["1","2","3","Canc"]} handleAdd={handleAddKeyPadValue} handleRemove={handleRemoveKeyPadValue} next={next} />
			<KeyPadRow rowContent={["4","5","6","Clear"]} handleAdd={handleAddKeyPadValue} handleRemove={handleRemoveKeyPadValue} next={next} />
			<KeyPadRow rowContent={["7","8","9","Enter"]} handleAdd={handleAddKeyPadValue} handleRemove={handleRemoveKeyPadValue} next={next} />
			<KeyPadRow rowContent={["","0","",""]} handleAdd={handleAddKeyPadValue} handleRemove={handleRemoveKeyPadValue} next={next} />
		</Grid>
	);
};

export default KeyPad;