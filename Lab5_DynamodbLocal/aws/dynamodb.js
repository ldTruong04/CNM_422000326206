import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  CreateTableCommand,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";

const region = process.env.AWS_REGION || "us-east-1";
const tableName = process.env.DYNAMODB_TABLE_PRODUCTS || "Products";
const endpoint = process.env.DYNAMODB_ENDPOINT || undefined;

// Chỉ dùng DynamoDB Local: endpoint + credentials giả (không kết nối AWS cloud)
const client = new DynamoDBClient({
  region,
  ...(endpoint && {
    endpoint,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "local",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "local",
    },
  }),
});

export const db = DynamoDBDocumentClient.from(client);
export const rawClient = client;
export const TABLE_PRODUCTS = tableName;

/** Tạo bảng Products nếu dùng DynamoDB Local (endpoint có giá trị) */
export async function ensureTable() {
  if (!endpoint) return;
  try {
    await rawClient.send(
      new DescribeTableCommand({ TableName: tableName })
    );
  } catch (e) {
    if (e.name === "ResourceNotFoundException") {
      await rawClient.send(
        new CreateTableCommand({
          TableName: tableName,
          KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
          AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
          BillingMode: "PAY_PER_REQUEST",
        })
      );
      console.log("Created table:", tableName);
    } else throw e;
  }
}

/** @param { { id: string, name: string, price: number, url_image: string } } item */
export async function putItem(item) {
  await db.send(
    new PutCommand({ TableName: tableName, Item: item })
  );
  return item;
}

/** @param {string} id */
export async function getItem(id) {
  const r = await db.send(
    new GetCommand({ TableName: tableName, Key: { id } })
  );
  return r.Item ?? null;
}

export async function scanItems() {
  const r = await db.send(new ScanCommand({ TableName: tableName }));
  return r.Items ?? [];
}

/** @param {string} id */
/** @param { { name?: string, price?: number, url_image?: string } } updates */
export async function updateItem(id, updates) {
  const expr = [];
  const names = {};
  const values = {};
  if (updates.name !== undefined) {
    expr.push("#n = :n");
    names["#n"] = "name";
    values[":n"] = updates.name;
  }
  if (updates.price !== undefined) {
    expr.push("#p = :p");
    names["#p"] = "price";
    values[":p"] = updates.price;
  }
  if (updates.url_image !== undefined) {
    expr.push("#u = :u");
    names["#u"] = "url_image";
    values[":u"] = updates.url_image;
  }
  if (expr.length === 0) return await getItem(id);
  await db.send(
    new UpdateCommand({
      TableName: tableName,
      Key: { id },
      UpdateExpression: "SET " + expr.join(", "),
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    })
  );
  return await getItem(id);
}

/** @param {string} id */
export async function deleteItem(id) {
  await db.send(
    new DeleteCommand({ TableName: tableName, Key: { id } })
  );
}
