import { act } from "react-dom/test-utils";
import { getCompletePathImage, resetErrors } from "../Commons";
import { DEFAULT_PATH_ICONS_S3 } from "../Constants";

describe("Commons Tests", () => {

    test("testing getCompletePathImage constant", () => {
        const testImage = "test/path/image.png";
        const result = getCompletePathImage(testImage);
        expect(result).toEqual(process.env.REACT_APP_CDN_BASEURL + DEFAULT_PATH_ICONS_S3+ testImage);
    });

    test("reset specific error", () => {
        const errors = { field1: "Errore 1", field2: "Errore 2" };
        let mockErrors = { ...errors };
        const setErrors = (func: any) => {
          mockErrors = func(mockErrors);
        };
    
        act(() => {
          resetErrors(errors, setErrors, "field1");
        });
    
        expect(mockErrors).toEqual({ field2: "Errore 2" });
      });
    
      test("should not reset a specific field error if it does not exist", () => {
        const errors = { field1: "Errore 1", field2: "Errore 2" };
        let mockErrors = { ...errors };
        const setErrors = (func: any) => {
          mockErrors = func(mockErrors);
        };
    
        act(() => {
          resetErrors(errors, setErrors, "field3");
        });
    
        expect(mockErrors).toEqual(errors);
      });

      test("should reset all errors of the fields", () => {
        const errors = { field1: "Error 1", field2: "Error 2" };
        let updatedErrors: any = {};
        const setErrors = jest.fn((func: any) => {
            updatedErrors = func(updatedErrors);
        });

        act(() => {
            resetErrors(errors, setErrors);
        });
    });

});