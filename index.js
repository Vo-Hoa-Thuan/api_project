require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/khuTro.route")(app);
require("./routes/adminRoutes")(app);
require("./routes/nguoiDung.router")(app);
require("./routes/hopDong.router")(app);
require("./routes/phong.route")(app);
app.listen(port);

console.log("RESTful API server started on: " + port);