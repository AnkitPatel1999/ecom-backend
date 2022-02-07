require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//My Routes
const authRoutes = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');

//mongodb+srv://ankit:<password>@cluster0.n608t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//DB CONNECTION
mongoose.connect('mongodb+srv://ankit:ankit@cluster0.n608t.mongodb.net/nodeapi?retryWrites=true&w=majority',{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
}).then(() => {
    console.log("DB Connected");
})

//MY ROUTES
app.use('/api', authRoutes);
app.use('/api', userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', orderRoute);
app.use('/api', paymentRoute);
app.use('/ok',(req, res)=>{
    console.log(req.body?.name)
})
//PORT

var server_port = process.env.YOUR_PORT || process.env.PORT || 8000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});