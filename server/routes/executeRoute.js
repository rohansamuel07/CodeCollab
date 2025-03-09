const express = require("express");
const executeCode = require("../utils/executeCode");

const router = express.Router();

router.post("/run", (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ output: "Missing code or language" });
  }

  executeCode(code, language, (output) => {
    res.json({ output });
  });
});

module.exports = router;
