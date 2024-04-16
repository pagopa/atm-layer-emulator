import { base64_encode } from "../decode";

describe("base64_encode function", () => {
  test("encodes text to Base64 correctly", () => {
    const inputText = "Hello, World!";
    const expectedEncodedText = "SGVsbG8sIFdvcmxkIQ==";
    const encodedText = base64_encode(inputText);
    expect(encodedText).toEqual(expectedEncodedText);
  });
});
