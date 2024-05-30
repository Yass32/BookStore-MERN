import express from "express";
import {PORT, mongoURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModels.js";

//An Express application instance is created.
const app = express();

//adds the middleware to parse JSON bodies of incoming requests. Without this, request.body will be undefined
app.use(express.json());

//Route handler for HTTP GET requests to the root URL ('/')
app.get('/', (request, response) => {
    //Represents the incoming HTTP request, containing data about the request
    console.log(request);
    //Represents the outgoing HTTP response that you'll send back to the client
    console.log(response);
    //Sends a response with a status code and the body text "Welcome to MERN".
    return response.status(200).send("Welcome to MERN");
})

//Route to save a new Book
app.post('/books', async (request, response) => {
    try {
        console.log(request.body);

        // Destructure the fields from the parsed JSON data in request.body.
        const {title, author, publishedYear} = request.body;

        //checks if the fields are missing in the request body
        if (!title || !author || !publishedYear) {
            return response.status(400).send("Please provide all the required fields");
        }

        //creates a new book object with the data from the request body
        const newBook = { title, author, publishedYear };

        //uses the Book model's create method to save the new book to the database
        const book = await Book.create(newBook);

        //If the book is successfully created, it sends a 201 Created response with the new book object
        return response.status(201).send(book);
    }
    catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Route for get all books from database
app.get("/books", async (request, response) => {
    try {
        // Use the Book model to find all documents in the 'books' collection
        const books = await Book.find({});

        // Send a 200 OK response with a JSON object data
        return response.status(200).json({ 
            count: books.length, // Number of books found
            data: books //Array of book document
        });

    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Route for get book from database using id
app.get("/books/:id", async (request, response) => {
    try {
        //Extract the ID from the request parameters
        const { id } = request.params;

        //Find the book in the database using the extracted ID
        const books = await Book.findByID(id);

        // Send a 200 OK response with a JSON data
        return response.status(200).json(books);
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})


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