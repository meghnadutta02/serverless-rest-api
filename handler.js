"use strict";
const DynamoDB = require("aws-sdk/clients/dynamodb");
const docClient = new DynamoDB.DocumentClient({
  region: "us-east-1",
  maxRetries: 3,
  httpOptions: {
    timeout: 10000,
  },
});
const NOTES_TABLE_NAME = process.env.NOTES_TABLE_NAME;

//timeout for api gateway is 29 seconds and lambda timeout is 15 minutes so we should set timeout for lambda to 29 seconds
const send = (statusCode, messag) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(messag),
  };
};

module.exports.createNote = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  //this is how you can access the context that is passed down from the authorizer
  console.log(event.requestContext.authorizer.foo);
  let data = JSON.parse(event.body);
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
      Item: {
        notesId: data.id,
        title: data.title,
        body: data.body,
      },
      ConditionExpression: "attribute_not_exists(notesId)",
    };
    await docClient.put(params).promise();
    callback(null, send(201, "Note created successfully"));
  } catch (err) {
    callback(null, send(500, err.message));
  }
};

module.exports.getNotes = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
    };
    const data = await docClient.scan(params).promise();
    callback(null, send(200, data.Items));
  } catch (err) {
    callback(null, send(500, err.message));
  }
};

module.exports.updateNote = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let notesId = event.pathParameters.id;
  let data = JSON.parse(event.body);
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
      Key: {
        notesId,
      },
      UpdateExpression: "set #title = :title, #body = :body",
      ExpressionAttributeNames: {
        "#title": "title",
        "#body": "body",
      },
      ExpressionAttributeValues: {
        ":title": data.title,
        ":body": data.body,
      },
      ConditionExpression: "attribute_exists(notesId)",
    };
    await docClient.update(params).promise();
    callback(null, send(200, `Note id: ${notesId} updated successfully`));
  } catch (err) {
    callback(null, send(500, err.message));
  }
};

module.exports.deleteNote = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let notesId = event.pathParameters.id;
  try {
    const params = {
      TableName: NOTES_TABLE_NAME,
      Key: { notesId },
      ConditionExpression: "attribute_exists(notesId)",
    };
    await docClient.delete(params).promise();
    callback(null, send(200, `Note id: ${notesId} deleted successfully`));
  } catch (err) {
    callback(null, send(500, err.message));
  }
  return {
    statusCode: 200,
    body: JSON.stringify("Note id: " + notesId + " updated successfully"),
  };
};
