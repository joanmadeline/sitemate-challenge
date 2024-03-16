const fs = require("fs").promises;
const path = require("path");

async function readIssuesAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading or parsing file: ${error.message}`);
  }
}

module.exports = { readIssuesAsync };
