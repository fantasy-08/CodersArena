const express=require('express');
const app=express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys/keys.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//DB-Schema
require('./models/question')
require("./models/coder")

//Routes
app.use(require("./routes/coder"));
app.use(require("./routes/compiler"));
app.use(require("./routes/problem"));

//DB Connection
mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected',()=>
    console.log("Data Base has been connected"))

mongoose.connection.on('error',()=>{
    console.log("error connecting to Data Base")
})

app.listen(5000,()=>{
    console.log('server started at 5000');
})