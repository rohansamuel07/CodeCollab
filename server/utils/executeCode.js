const { exec } = require("child_process");

const executeCode = (code, language, callback) => {
  let command;

  // Create command based on the selected language
  switch (language) {
    case "javascript":
      command = `node -e "${code.replace(/"/g, '\\"')}"`;
      break;
    case "python":
      command = `python -c "${code.replace(/"/g, '\\"')}"`;
      break;
    case "c":
      command = `echo "${code}" | gcc -x c -o temp.out - && ./temp.out`;
      break;
    case "cpp":
      command = `echo "${code}" | g++ -x c++ -o temp.out - && ./temp.out`;
      break;
    case "java":
      command = `echo "${code}" > Temp.java && javac Temp.java && java Temp`;
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
