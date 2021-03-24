require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require('./routes/auth')
const userRoute = require('./routes/user')

//DB CONNECTION
mongoose.connect(process.env.DATABASE,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
}).then(() => {
    console.log("DB Connected");
})

//Middleware

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY ROUTES
app.use('/api', authRoutes);
app.use('/api', userRoute);

//PORT
const port = process.env.PORT || 8000;

//STARTING A SERVER
app.listen(port, () => {
    console.log(`App is running at ${port}`);
})