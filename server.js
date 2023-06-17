const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()
const { MONGO_URI } = require("./config/keys");
app.use(express.json());


const nodemailer = require('nodemailer');

// Define a route to handle email sending
app.post('/send-email', (req, res) => {
  const { email } = req.body;

  // Create a transporter using your email service provider's settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'maqsoodhashim03@gmail.com',
      pass: 'hqjsbeymjbhbbsew',
    },
    port: 465,
    secure: true,
  });
  

  // Prepare the email options
  const mailOptions = {
    from: 'MUET-LMS',
    to: email,
    subject: 'Account verification',
    text: 'Important!! It is informed to you that your account has been verified.Now you can login to your account.',
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});
// TODO:middleware

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//TODO: Routes

app.use("/auth", require("./routes/authRoute"));
app.use("/", require("./routes/courseRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/profile", require("./routes/profileRoute"));
app.use("/enroll-course", require("./routes/enrollRoute"));
app.use('/', require('./routes/QuestionRoutes'));
app.use('/', require('./routes/GradesRoutes'));

//TODO: Deploy:

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//TODO: Database and server created

const PORT = process.env.PORT || 5000;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Error occurred");
  });
