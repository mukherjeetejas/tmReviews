//importing libraries
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
//routes
import postRoutes from "./routes/posts.js"
//env variables
import dotenv from "dotenv"
dotenv.config();
//init the app 
const app = express();

//setting up body parsers to properly send requests
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send("welcome to reviews API")
})

app.use('/posts', postRoutes);
const url = "mongodb+srv://mukherjeetejas:8Pjt3W&;Tp_75?M@cluster0.tvrvq.mongodb.net/?retryWrites=true&w=majority";
//connect to mongoDB cloud atlas version
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log (`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

