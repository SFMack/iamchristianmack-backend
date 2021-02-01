const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://iamchristianmack.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("We lit");
});

app.post("/api/send", (req, res) => {
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

app.listen(PORT, () => {
  console.log("Port 8000 is live");
});
