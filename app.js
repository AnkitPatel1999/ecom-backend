require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
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

var server_port = process.env.YOUR_PORT || process.env.PORT || 8000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});