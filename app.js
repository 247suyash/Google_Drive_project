const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser")
const userAuthentication = require("./middleware/auth")
const routes = require("./routes");
const mongoose = require("mongoose");
const { engine } = require('express-handlebars');
const Handlebars = require("handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const {ImageModel} =require("./models")
const path = require("path");
const app = express();
app.engine(".hbs", engine({
  extname: ".hbs",
  defaultLayout: "main",
  handlebars:allowInsecurePrototypeAccess(Handlebars),
})
)
app.use(express.json());
app.use(cookieParser());
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/upload')));

app.use("/v1", routes);

app.get("/register", (req, res) => {
  res.render("account/registration", {
    StyleSheet: "registration.css"
  })
})
app.get("/login", (req, res) => {
  res.render("account/login", {
    StyleSheet: "login.css"
  })
})

app.get("/", userAuthentication, async (req, res ,next) => {
  const ImageData =  ImageModel.find({});
  ImageData.exec(function(err,data){
      return res.render("home/home", {
        StyleSheet: "home.css",
        data:data
      })
  })
})

// const path = require('path')  

mongoose
  .connect("mongodb://localhost:27017/google_project")
  .then(() => console.log("Database connected successfully..."))
  .catch(console.log);

const server = http.createServer(app);

server
  .listen(3000)
  .on("listening", () => {
    console.log(`Server is running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
