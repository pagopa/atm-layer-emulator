import { SetStateAction } from "react";
import ModalTemplate from "./template/ModalTemplate";

type Props = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
    setContentText: string;
};

export default function ModalQrScan({ open, setOpen, title, setContentText }: Props) {
	<ModalTemplate 
		titleModal={title} 
		contentText={setContentText} 
		open={false} 
		setOpen={setOpen} 
		handleSubmit={undefined}
	/>;
};