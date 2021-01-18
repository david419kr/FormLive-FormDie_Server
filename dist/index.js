"use strict";
exports.__esModule = true;
var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
var hpp = require("hpp");
var helmet = require("helmet");
dotenv.config();
var app = express();
var prod = process.env.NODE_ENV === 'production';
if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: /yangsikdang\.ml$/,
        credentials: true
    }));
}
else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true
    }));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod ? '.yangsikdang.ml' : undefined,
        sameSite: 'none'
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function (req, res, next) {
    res.send('테스트');
});
// app.use('/user');
// app.use('/form');
// app.use('/group');
// app.use('/history');
// app.use('/suggestion');
// app.use('/auth');
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server Running at " + port);
});
// certificate;
// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/yangsikdang.ml/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/yangsikdang.ml/cert.pem",
//   "utf8"
// );
// const ca = fs.readFileSync(
//   "/etc/letsencrypt/live/yangsikdang.ml/chain.pem",
//   "utf8"
// );
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };
//const https_server = https.createServer(credentials, app);
// https_server.listen("8443", () => {
//   console.log(`https Server Running at 8443`);
// });