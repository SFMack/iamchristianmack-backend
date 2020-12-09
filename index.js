const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const APP = express();

const PORT = process.env.PORT || 8000;

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: true }));

APP.use(cors());

APP.listen(PORT, () => {
  console.log("Port 8000 is live");
});

APP.get("/", (req, res) => {
  res.send("We lit");
});

APP.post("/api/send", (req, res) => {
  const data = req.body;
  console.log(data);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.user,
      pass: process.env.pass,
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
      accessToken: process.env.accessToken,
    },
  });

  const mailOptions = {
    from: "new@gmail.com",
    to: "christian.ak.mack@gmail.com",
    subject: `New message from: ${data.email}`,
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
