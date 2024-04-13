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
  describe("Create Note", () => {
    it("should create a new note", async () => {
      expect(true).toEqual(true);
    });
  });
});
