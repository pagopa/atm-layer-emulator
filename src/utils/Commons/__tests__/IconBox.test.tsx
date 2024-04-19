import { render } from "@testing-library/react";
import IconBox from "../IconBox";


beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("Render Icon Box with default size and color test", () => {
	test("First render", () => {
		const {getByTestId} = render(
			<IconBox icon={"HomeOutlined"}  />
		);
		expect(getByTestId("icon-box")).toBeInTheDocument();
	});
});