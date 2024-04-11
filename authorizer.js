// Here we are using a lambda authorizer in combination with cognito user pools to authenticate the user. The authorizer will check the token that is passed in the header of the request and verify it using the cognitoJwtVerifier. If the token is valid, the authorizer will return a policy that allows the user to access the resource. If the token is invalid, the authorizer will return an unauthorized error. The authorizer is attached to the API Gateway in the serverless.yml file.

const { CognitoJwtVerifier } = require("aws-jwt-verify");
const userPoolId = process.env.COGNITO_USER_POOL_ID;
const clientId = process.env.COGNITO_CLIENT_ID;

const cognitoJwtVerifier = CognitoJwtVerifier.create({
  userPoolId: userPoolId,
  tokenUse: "id",
  clientId: clientId,
});
const generatePolicy = (principalId, effect, resource) => {
  var authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    let policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Resource: resource,
          Action: "execute-api:Invoke",
        },
      ],
    };
    authResponse.policyDocument = policyDocument;
  }
  //this is the context that is passed down to the lambda functions using the authorizer
  authResponse.context = {
    foo: "bar",
  };
  console.log(JSON.stringify(authResponse));
  return authResponse;
};

exports.handler = async (event, context, callback) => {
  var token = event.authorizationToken;
  //console.log(JSON.stringify(token));
  try {
    const payload = await cognitoJwtVerifier.verify(token);
    //console.log(JSON.stringify(payload));
    //if the token is valid, return the policy and allow the user to access the resource
    callback(null, generatePolicy("user", "Allow", event.methodArn));
  } catch (error) {
    callback("Unauthorized");
  }
};

//cognito authorizer only checks if the token is valid, it does not check if the user has the correct permissions to access the resource. So even if the user does not have the correct permissions, they will still be able to access the resource if the token is valid. To check if the user has the correct permissions, we should use a custom labda authorizer or use IAM policies in combination with the cognito authorizer.
