"use strict";
const AWS = require("aws-sdk");
const ssm = new AWS.SSM();
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.authenticatedUser = async () => {
  const userPoolIdParam = await ssm
    .getParameter({ Name: "/notes/dev/userPoolID" })
    .promise();
  const clientIdParam = await ssm
    .getParameter({ Name: "/notes/dev/clientID" })
    .promise();
  const usernameParam = await ssm
    .getParameter({ Name: "/notes/dev/username" })
    .promise();
  const passwordParam = await ssm
    .getParameter({ Name: "/notes/dev/password" })
    .promise();

  const userPoolId = userPoolIdParam.Parameter.Value;
  const clientId = clientIdParam.Parameter.Value;
  const username = usernameParam.Parameter.Value;
  const password = passwordParam.Parameter.Value;

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
