import fs from "fs";

const fileDir = "uploads"; // Directory where files are uploaded

// Read data from file
export function readDataFromFile(fileName) {
  try {
    const data = fs.readFileSync(`${fileDir}/${fileName}`, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write data to file
export function writeDataToFile(fileName, data) {
  fs.writeFileSync(
    `${fileDir}/${fileName}`,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

// Delete file
export function deleteFile(fileName, cb) {
  fs.unlink(`${fileDir}/${fileName}`, cb);
}

// Read dir
export function readDir(cb) {
  fs.readdir("uploads", cb);
}
