const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'data', 'products.json');

function readData() {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  all() {
    return readData();
  },

  create(attrs = {}) {
    const products = readData();
    const id = Date.now().toString();
    const item = Object.assign({ id }, attrs);
    products.push(item);
    writeData(products);
    return item;
  },

  findById(id) {
    const products = readData();
    return products.find(p => p.id === String(id));
  },

  update(id, attrs = {}) {
    const products = readData();
    const index = products.findIndex(p => p.id === String(id));
    if (index === -1) return null;
    products[index] = Object.assign({}, products[index], attrs);
    writeData(products);
    return products[index];
  },

  remove(id) {
    const products = readData();
    const index = products.findIndex(p => p.id === String(id));
    if (index === -1) return false;
    products.splice(index, 1);
    writeData(products);
    return true;
  }
};
