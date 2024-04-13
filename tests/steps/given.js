"use strict";
const AWS = require("aws-sdk", { region: "us-east-1" });
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.authenticatedUser = async () => {
  const userPoolId = process.env.USER_POOL_ID;
  const clientId = process.env.CLIENT_ID;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const params = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    ClientId: clientId,
    UserPoolId: userPoolId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  let user = await cognito.adminInitiateAuth(params).promise();
  return user;
};
