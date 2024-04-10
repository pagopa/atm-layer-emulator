import { act } from "react-dom/test-utils";
import { getCompletePathImage, resetErrors } from "../Commons";
import { DEFAULT_PATH_IMAGES } from "../Constants";

describe("Commons Tests", () => {

    test("testing getCompletePathImage constant", () => {
        const testImage = "test/path/image.png";
        const result = getCompletePathImage(testImage);
        expect(result).toEqual(process.env.REACT_APP_URL_FE + DEFAULT_PATH_IMAGES+ testImage);
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
          resetErrors(errors, setErrors, "fieldNonEsistente");
        });
    
        expect(mockErrors).toEqual(errors);
      });

});