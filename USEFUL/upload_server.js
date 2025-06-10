const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Configure Multer storage
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep original file name
    }
});
const upload = multer({ storage: storage });

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
    res.send({ message: "File uploaded successfully!" });
});

// Get list of uploaded files
app.get("/files", (req, res) => {
    fs.readdir("uploads/", (err, files) => {
        if (err) {
            res.status(500).json({ error: "Error reading files" });
        } else {
            res.json(files);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
