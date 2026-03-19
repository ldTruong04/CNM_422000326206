const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  accessKeyId: "fakeMyKeyId",
  secretAccessKey: "fakeSecretAccessKey"
});

const dynamoDB = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamoDB,
  documentClient
};