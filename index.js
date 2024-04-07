import express from "express";
import bodyParser from "body-parser";
import {
  deleteFile,
  readDataFromFile,
  readDir,
  writeDataToFile,
} from "./utils/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// GET file content JSON
app.get("/file", (req, res) => {
  const fileName = req.body.fileName;
  const data = readDataFromFile(fileName);

  res.json(data);
});

// POST a new file
app.post("/file", (req, res) => {
  const data = req.body.data;
  const fileName = req.body.fileName;

  try {
    writeDataToFile(fileName, data);
    res.send("OK");
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update file
app.put("/file", (req, res) => {
  const newData = req.body.data;
  const fileName = req.body.fileName;
  try {
    const dataFromFile = readDataFromFile(fileName);
    const updatedData = { ...dataFromFile, ...newData };

    writeDataToFile(fileName, updatedData);

    res.json(updatedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE file
app.delete("/file", (req, res) => {
  const fileName = req.body.fileName;
  deleteFile(fileName, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send("File Deleted");
    }
  });
});

// GET all files in the directory
app.get("/files", (req, res) => {
  readDir((err, files) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(files);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
