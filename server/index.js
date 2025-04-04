import express from "express";
import mongoose from "mongoose";
import bookRoutes from "../server/routes/bookRoutes.js";
import cors from "cors";
//The dotenv package is used to load environment variables from a .env file into process.env.
//This allows you to keep sensitive information like database connection strings and API keys out of your source code.
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5555; // Set the port to listen on, defaulting to 5000 if not specified in .env
const mongoURL = process.env.MONGO_URI; // MongoDB connection string from environment variables

//An Express application instance is created.
const app = express();

//adds the middleware to parse JSON bodies of incoming requests. Without this, request.body will be undefined
app.use(express.json());

//Cross origin resource sharing is a browser security feature that restricts 
//web pages from making requests to a different domain than the one that served the web page
app.use(cors({
    origin: "https://bookstore-mern-client.onrender.com", // Allow only requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow only these methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
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