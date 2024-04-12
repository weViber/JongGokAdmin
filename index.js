const express = require("express");
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/build')));

app.use(cors({
    // origin: "http://junggokadmin-env.eba-eypydvxj.ap-northeast-2.elasticbeanstalk.com/",
    // methods: ["GET", "POST"],
    credentials: true,
}));

mongoose.set('strictQuery', true);
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://lyncare:fls2022@lyncare.5ip2vsa.mongodb.net/junggok?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8080
const db = require("./app/models");

db.mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`Server Start : ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

// routes
require('./app/routes/reservation.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/user.routes')(app);

// *
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});