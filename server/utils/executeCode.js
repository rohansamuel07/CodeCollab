// executeCode.js
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const executeCode = (code, language, input, callback) => {
  const tempDir = path.join(__dirname, "../scripts/temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const fileExtension = {
    c: "c",
    cpp: "cpp",
    python: "py",
    javascript: "js",
    java: "java",
  }[language];

  if (!fileExtension) {
    return callback("Unsupported language");
  }

  const uniqueId = crypto.randomUUID();
  const codeFilePath = path.join(tempDir, `temp_${uniqueId}.${fileExtension}`);
  const inputFilePath = path.join(tempDir, `input_${uniqueId}.txt`);

  fs.writeFileSync(codeFilePath, code);
  fs.writeFileSync(inputFilePath, input || ""); // Save input to file

  const command = `bash ${path.join(__dirname, "../scripts/execute_code.sh")} ${language} ${codeFilePath} ${inputFilePath}`;

  exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
    fs.unlinkSync(codeFilePath);
    fs.unlinkSync(inputFilePath);

    if (error) {
      return callback(stderr || "Execution error");
    }
    callback(stdout);
  });
};

module.exports = executeCode;