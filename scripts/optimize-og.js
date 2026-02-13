const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const inputPath = process.argv[2];
const outputPath = path.join(__dirname, "..", "public", "og-image.jpg");

if (!inputPath || !fs.existsSync(inputPath)) {
  console.error("Usage: node optimize-og.js <input-image-path>");
  process.exit(1);
}

sharp(inputPath)
  .resize(1200, 630, { fit: "cover", position: "center" })
  .jpeg({ quality: 78 })
  .toFile(outputPath)
  .then((info) => {
    console.log("Done:", outputPath, "size:", Math.round(info.size / 1024), "KB");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
