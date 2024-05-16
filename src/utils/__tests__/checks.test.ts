import checks from "../checks";

describe("Validation Functions", () => {
  test("isInvalidField returns true for invalid fields", () => {
    expect(checks().isInvalidField(undefined)).toBe(true);
    expect(checks().isInvalidField(null)).toBe(true);
    expect(checks().isInvalidField("")).toBe(true);
    expect(checks().isInvalidField(" ")).toBe(true);
    expect(checks().isInvalidField(-1)).toBe(true);
  });

  test("isInvalidField returns false for valid fields", () => {
    expect(checks().isInvalidField("somevalue")).toBe(false);
    expect(checks().isInvalidField(0)).toBe(false);
    expect(checks().isInvalidField(10)).toBe(false);
  });

  test("cfIsValid returns true for valid Italian fiscal codes", () => {
    expect(checks().cfIsValid("RSSMRA94A01H501Z")).toBe(true);
    expect(checks().cfIsValid("GRTMRC97L19D612T")).toBe(true);
  });

  test("cfIsValid returns false for invalid Italian fiscal codes", () => {
    expect(checks().cfIsValid("")).toBe(false);
    expect(checks().cfIsValid("RSSMRA94A01H501Z1")).toBe(false);
    expect(checks().cfIsValid("RSSMRA94A01H501")).toBe(false);
    expect(checks().cfIsValid("RSSMRA94A01H50Z")).toBe(false);
  });

  test("ibanIsValid returns true for valid Italian IBANs", () => {
    expect(checks().ibanIsValid("IT60X0542811101000000123456")).toBe(true);
    expect(checks().ibanIsValid("IT22A0335901600")).toBe(false);
  });

  test("ibanIsValid returns false for invalid Italian IBANs", () => {
    expect(checks().ibanIsValid("")).toBe(false);
    expect(checks().ibanIsValid("IT60X054281110100000012345")).toBe(false);
    expect(checks().ibanIsValid("IT22A0335901600X")).toBe(false);
  });

  test("panIsValid returns true for valid PANs", () => {
    expect(checks().panIsValid("1234567890123456")).toBe(true);
    expect(checks().panIsValid("9876543210123456")).toBe(true);
  });

  test("panIsValid returns false for invalid PANs", () => {
    expect(checks().panIsValid("")).toBe(false);
    expect(checks().panIsValid("12345678901234567812374")).toBe(false);
    expect(checks().panIsValid("123456789012345")).toBe(false);
    expect(checks().panIsValid("123456789012345X")).toBe(false);
  });

  test("isValidInputValue returns true for valid input values", () => {
    expect(checks().isValidInputValue("ABC123", "[A-Z0-9]+")).toBe(true);
    expect(checks().isValidInputValue("1234", "[0-9]+")).toBe(true);
  });

  test("isValidInputValue returns false for invalid input values", () => {
    expect(checks().isValidInputValue("123", "[0-9]+")).toBe(true);
    expect(checks().isValidInputValue("1234", "[A-Z]+")).toBe(false);
  });
});
