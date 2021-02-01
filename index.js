const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const APP = express();

const PORT = process.env.PORT || 8000;

// APP.use(cors());

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));

APP.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

APP.listen(PORT, () => {
  console.log("Port 8000 is live");
});

APP.get("/", (req, res) => {
  res.send("We lit");
});

APP.post("/api/send", (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(process.env.user);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: `${data.email}`,
    to: "christian.ak.mack@gmail.com",
    subject: `New message from: ${data.name}`,
    html: `<p>${data.name}</p><p>${data.email}</p><p>${data.message}</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
});
