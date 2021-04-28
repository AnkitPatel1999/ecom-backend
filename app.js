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
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/paymentRoute');

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
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', orderRoute);
app.use('/api', paymentRoute);

//PORT
const port = process.env.PORT || 8000;

//STARTING A SERVER
app.listen(port, () => {
    console.log(`App is running at ${port}`);
})