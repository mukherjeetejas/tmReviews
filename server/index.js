//importing libraries
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
//routes
import postRoutes from "./routes/posts.js"
//env variables
import dotenv from "dotenv"
//init the app 
const app = express();
dotenv.config();
//setting up body parsers to properly send requests
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send("welcome to reviews API")
})

app.use('/posts', postRoutes);
const url = process.env.DATABASE;
//connect to mongoDB cloud atlas version
const PORT = process.env.PORT || 5000;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log (`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

