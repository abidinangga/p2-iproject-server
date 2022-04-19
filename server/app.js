if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  }
const express = require("express");
const app = express();
const routers = require("./routers/index");
const port = process.env.PORT || 3000;
const { errorHandler } = require("./middlewares/errorHandler");
const cors =require('cors');

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routers);
app.use(errorHandler);

app.listen(port, function(){
  console.log("Express server listening on port %d",port);
});

module.exports = app;

