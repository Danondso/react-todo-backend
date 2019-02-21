const express = require("express");
const app = express();
const cors = require('cors');
const port = 3200;



app.use(cors());

app.post("/login", (req, res) => {
console.log("Endpoint Hit...");
  res.send({
    firstName: "Dublin",
    lastName: "Anondson"
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
