const app = require("./app");

app.listen(process.env.PORT || 3000);

console.log(`Running on port ${process.env.port || 3000}`);
