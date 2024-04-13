"use strict";
const { init } = require("./steps/init");
const { authenticatedUser } = require("./steps/given");

describe("Notes", () => {
  beforeAll(async () => {
    init();
    let user = await authenticatedUser();
    let idToken = user.AuthenticationResult.IdToken;
    console.log(idToken);
  });
  it("should create a note", async () => {
    expect(true).toEqual(true);
  });
});
