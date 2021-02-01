const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("We lit");
});

app.post("/api/send", async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "sfcamack@icloud.com",
    from: "sfcamack@icloud.com",
    subject: "Sent with SendGrid",
    text: "This is all the text. Not too much. Just enough.",
    html: "<strong>not sure what this is for</strong>",
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
});

app.listen(PORT, () => {
  console.log("Port 8000 is live");
});
