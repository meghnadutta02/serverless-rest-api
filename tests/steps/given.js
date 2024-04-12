"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.authenticated_user = async () => {
  const userPoolId = process.env.USER_POOL_ID;
  const clientId = process.env.CLIENT_ID;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  let params = {
    AuthFlow: "ALLOW_ADMIN_USER_PASSWORD_AUTH",
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
