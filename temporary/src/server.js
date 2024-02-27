const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config({path:'./backend/config.env'});


const app = express();
const port = process.env.PORT || 5000;
console.log(port);
app.use(cors());
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017/test';
console.log(uri)
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const userRouter = require('./components/routes/user');


app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});