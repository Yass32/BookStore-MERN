import express from "express";
import {PORT, mongoURL} from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "../backend/routes/bookRoutes.js";
import cors from "cors";

//An Express application instance is created.
const app = express();

//adds the middleware to parse JSON bodies of incoming requests. Without this, request.body will be undefined
app.use(express.json());

//Cross origin resource sharing is a browser security feature that restricts 
//web pages from making requests to a different domain than the one that served the web page
app.use(cors({
    origin: "http://localhost:5173", // Allow only requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow only these methods
    allowedHeaders: "Content-Type" //specifies the media type of the resource or the data being sent. 
}))

// Mount the bookRoutes router at '/books'
app.use('/books', bookRoutes);

// Establish connection to MongoDB database using Mongoose
mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("App is connected to database");
        //The app starts listening on the specified port and logs a message to the console to confirm the server is running.
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`); //Log success message to the console
        })
    })
    .catch((error) => {
        console.log(error); // Log the error message to the console
    });