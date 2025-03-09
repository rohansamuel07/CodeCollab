/*
const { exec } = require("child_process");
const fs = require("fs");

const executeCode = (code, language, callback) => {
  let command;

  switch (language) {
    case "javascript":
      command = `node -e "${code.replace(/"/g, '\\"')}"`;
      break;

    case "python":
      fs.writeFileSync("temp.py", code);
      command = `python3 temp.py`;
      break;

    case "c":
      fs.writeFileSync("temp.c", code);
      command = `gcc temp.c -o temp.out && ./temp.out`;
      break;

    case "cpp":
      fs.writeFileSync("temp.cpp", code);
      command = `g++ temp.cpp -o temp.out && ./temp.out`;
      break;

    case "java":
      fs.writeFileSync("Test.java", code);
      command = `javac Test.java && java Test`;
      break;

    default:
      return callback("Unsupported language");
  }

  exec(command, (error, stdout, stderr) => {
    if (error || stderr) {
      callback(error ? error.message : stderr);
    } else {
      callback(stdout);
    }
  });
};

module.exports = executeCode;
*/

const { exec } = require("child_process");
const fs = require("fs");

const executeCode = (code, language, callback) => {
  let command;
  let fileName;
  let outputFiles = [];

  switch (language) {
    case "javascript":
      command = `timeout 5s node -e "${code.replace(/"/g, '\\"')}"`;
      break;

    case "python":
      fileName = "temp.py";
      fs.writeFileSync(fileName, code);
      command = `timeout 5s python3 ${fileName}`;
      outputFiles.push(fileName);
      break;

    case "c":
      fileName = "temp.c";
      fs.writeFileSync(fileName, code);
      command = `gcc ${fileName} -o temp.out && timeout 5s ./temp.out`;
      outputFiles.push(fileName, "temp.out");
      break;

    case "cpp":
      fileName = "temp.cpp";
      fs.writeFileSync(fileName, code);
      command = `g++ ${fileName} -o temp.out && timeout 5s ./temp.out`;
      outputFiles.push(fileName, "temp.out");
      break;

    case "java":
      const match = code.match(/public\s+class\s+(\w+)/);
      if (!match) return callback("❌ Java class name not found!");

      fileName = `${match[1]}.java`;
      fs.writeFileSync(fileName, code);
      command = `javac ${fileName} && timeout 5s java ${match[1]}`;
      outputFiles.push(fileName, `${match[1]}.class`);
      break;

    default:
      return callback("❌ Unsupported language");
  }

  exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
    outputFiles.forEach((file) => fs.unlinkSync(file, { force: true }));

    if (error) return callback(`⚠ Error: ${error.message}`);
    if (stderr) return callback(`⚠ Stderr: ${stderr}`);
    callback(stdout);
  });
};

module.exports = executeCode;
