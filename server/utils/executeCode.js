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
