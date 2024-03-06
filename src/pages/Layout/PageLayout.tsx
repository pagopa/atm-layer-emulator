/* eslint-disable quotes */
import React, { useContext } from "react";
import { Ctx } from "../../DataContext";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { ScannerPage } from "../ScannerPage/ScannerPage";
import { InputFieldPage } from "../../components/InputFieldPage/InputFieldPage";
import { HomePage } from "./HomePage";

type Prop= {
	page: any;
};

export default function PageLayout({page}: Prop) {

	const { loading } = useContext(Ctx);

	return (
		<Ctx.Consumer>
			{() => (
				<React.Fragment>
					{loading ? <LoadingPage /> : page}
				</React.Fragment>
			)}
		</Ctx.Consumer>
	);
}
