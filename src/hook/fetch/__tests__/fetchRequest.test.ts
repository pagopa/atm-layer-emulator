import { handleResponse } from "../fetchRequest";

const originalFetch = global.fetch;

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => { });
	jest.spyOn(console, "warn").mockImplementation(() => { });
});

afterEach(() => {
	global.fetch = originalFetch;
});

describe("formOption Test", () => {
    
	test("Verifica la presenza dei dati in valueObject", () => {
		const status=200;
		const data={ valuesObj: "test", status, success: true }
		const response={};
		expect(handleResponse({response, data})).toEqual(data);
	});
   
});

