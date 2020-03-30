const exec = require("child_process").exec;

class UpdateController {
  static handleUpdate(req, res) {
    exec("git pull", (error, stdout, stderr) => {
      if (!stderr) {
        exec("npm install", (error, stdout, stderr) => {
          return res.status(200).send({ updated: true });
        });
      }
    });
  }
}

module.exports = UpdateController;
