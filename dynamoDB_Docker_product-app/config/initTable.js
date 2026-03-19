const { dynamoDB } = require("./dynamodb");

const TABLE_NAME = "Products";

async function ensureProductsTable() {
  try {
    await dynamoDB.describeTable({ TableName: TABLE_NAME }).promise();
    console.log(`DynamoDB table ${TABLE_NAME} already exists.`);
  } catch (error) {
    if (error.code !== "ResourceNotFoundException") {
      throw error;
    }

    const params = {
      TableName: TABLE_NAME,
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S"
        }
      ],
      BillingMode: "PAY_PER_REQUEST"
    };

    console.log(`Creating DynamoDB table ${TABLE_NAME}...`);
    await dynamoDB.createTable(params).promise();
    await dynamoDB.waitFor("tableExists", { TableName: TABLE_NAME }).promise();
    console.log(`DynamoDB table ${TABLE_NAME} created successfully.`);
  }
}

module.exports = {
  ensureProductsTable
};
