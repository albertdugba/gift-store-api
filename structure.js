const fs = require("fs");

const fileExistsSync = name => {
  return fs.existsSync(name);
};

module.exports = fileExistsSync;
