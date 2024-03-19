import React from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider} from "@mui/material";
import { LoadingButton } from "@mui/lab";

type Props = {
	titleModal: string;
	contentText: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit: any;
	children?:React.ReactNode;
	loading?: boolean;
};

export default function ModalTemplate({ titleModal, contentText, open, setOpen, handleSubmit, children, loading }: Props) {
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			fullWidth
			maxWidth={"sm"}
		>
			<DialogTitle>
				{titleModal}
			</DialogTitle>
			<Divider />
			<Box py={2}>
				<DialogContent>
					<DialogContentText>
						{contentText}
					</DialogContentText>
				</DialogContent>
			</Box>
			{children}
			<DialogActions >
				<Box display={"flex"} flexDirection={"row"} p={2}>
					<Box mr={2}>
						<Button variant={"outlined"} onClick={() => setOpen(false)}>Annulla</Button>
					</Box>
					<Box>
						<LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit}>Conferma</LoadingButton>
					</Box>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
