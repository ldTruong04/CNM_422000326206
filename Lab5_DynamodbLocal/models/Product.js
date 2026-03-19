import {
  putItem,
  getItem,
  scanItems,
  updateItem,
  deleteItem,
} from "../aws/dynamodb.js";

/** Model Product – bảng Products (id, name, price, url_image) */

export async function create(data) {
  const item = {
    id: data.id,
    name: String(data.name || "").trim(),
    price: Number(data.price) || 0,
    url_image: String(data.url_image || ""),
  };
  await putItem(item);
  return item;
}

export async function findById(id) {
  return await getItem(id);
}

export async function findAll() {
  return await scanItems();
}

export async function update(id, data) {
  const updates = {};
  if (data.name !== undefined) updates.name = String(data.name).trim();
  if (data.price !== undefined) updates.price = Number(data.price) || 0;
  if (data.url_image !== undefined) updates.url_image = String(data.url_image);
  if (Object.keys(updates).length === 0) return await findById(id);
  return await updateItem(id, updates);
}

export async function remove(id) {
  await deleteItem(id);
}
