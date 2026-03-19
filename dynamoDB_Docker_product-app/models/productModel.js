const { documentClient } = require("../config/dynamodb");

const TABLE = "Products";

exports.getAll = async () => {
  const params = { TableName: TABLE };
  const data = await documentClient.scan(params).promise();
  return data.Items;
};

exports.getById = async (id) => {
  const params = {
    TableName: TABLE,
    Key: { id }
  };
  const data = await documentClient.get(params).promise();
  return data.Item;
};

exports.create = async (product) => {
  const params = {
    TableName: TABLE,
    Item: product
  };
  return documentClient.put(params).promise();
};

exports.update = async (product) => {
  const params = {
    TableName: TABLE,
    Item: product
  };
  return documentClient.put(params).promise();
};

exports.delete = async (id) => {
  const params = {
    TableName: TABLE,
    Key: { id }
  };
  return documentClient.delete(params).promise();
};