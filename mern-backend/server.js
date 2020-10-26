const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();
const app = express();
const port = process.env.PORT|| 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Database connection established succefully!");
});

const userRouter = require('./routes/users');
const exerciseRouter = require('./routes/excercises');

app.use('/excercises', exerciseRouter);
app.use('/users',userRouter);


app.listen(port, ()=>{
    console.log(`Server is runnning in port : ${port}`);
});