import getIconBySetType from "../getIconBySetType";

describe("getIconBySetType Function Tests", () => {
  test("Should return the correct icon for a given string", () => {

    const { getIcon } = getIconBySetType();


    const icon1 = getIcon("HomeOutlined");
    const icon2 = getIcon("PublishOutlined");
    const icon3 = getIcon("Close");
    const icon4 = getIcon("UnknownIcon");


    expect(icon1).toBeDefined();
    expect(icon2).toBeDefined();
    expect(icon3).toBeDefined();
    expect(icon4).toBeDefined();
  });
});
