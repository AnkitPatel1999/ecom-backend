require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express();

const auth = require('./routes/auth')

//DB CONNECTION
mongoose.connect(process.env.DATABASE,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
}).then(() => {
    console.log("DB Connected");
})

//MY ROUTES
app.use('/api', auth);

//PORT
const port = process.env.PORT || 8000;

//STARTING A SERVER
app.listen(port, () => {
    console.log(`App is running at ${port}`);
})