import express from 'express';
import {Book} from '../models/bookModels.js';
import {User} from '../models/userModels.js'

const router = express.Router();

//Route to register
router.post('/register', async (request, response) => {
    try {
        console.log(request.body);

        // Destructure the fields from the parsed JSON data in request.body.
        const {username, password} = request.body;

        //checks if the fields are missing in the request body
        if (!username || !password) {
            return response.status(400).send("Please provide all the required fields");
        }

        //creates a new user object with the data from the request body
        const newUser = { username, password };

        //uses the User model's create method to save the new book to the database
        const user = await User.create(newUser);

        //If the user is successfully created, it sends a 201 Created response with the new book object
        return response.status(201).send(user);
    }
    catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Route to login
router.post('/login', async (request, response) => {
    try {
        console.log(request.body);

        // Destructure the fields from the parsed JSON data in request.body.
        const {username, password} = request.body;

        //checks if the fields are missing in the request body
        if (!username || !password) {
            return response.status(400).send("Please provide all the required fields");
        }

        // Find the user by username and password
        const loggedUser = await User.findOne({ username, password });

        // If user is not found, send a 400 response
        if (!loggedUser) {
            return res.status(400).send("Invalid username or password");
        }

        // If user is found, send a 200 response with the user details
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username
                // Add other user details you want to return
            }
        });
    }
    catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Route to save a new Book
router.post('/', async (request, response) => {
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
router.get("/", async (request, response) => {
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

//Route to get a book in database
router.get("/:id", async (request, response) => {
    try {
        //Extract the ID from the request parameters
        const { id } = request.params;

        //Find the book in the database using the extracted ID
        const books = await Book.findById(id);

        // Send a 200 OK response with a JSON data
        return response.status(200).json(books);
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

// PUT route to update a book with a given ID
router.put("/:id", async (request, response) => {
    try {
        // Validation
        if (!request.body.title || !request.body.author || !request.body.publishedYear) {
            return response.status(400).send("Please provide all the required fields");
        }

        // Extract the book ID from the request parameters
        const { id } = request.params;

        // Use the Book model to find a book by ID and update it with the data from the request body
        const updatedBook = await Book.findByIdAndUpdate(id, request.body);

        if(!updatedBook) {
            return response.status(404).send("Book not found");
        }
        
        return response.status(200).send({ message: "Book updated successfully" });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        // Use the Book model to delete a book by ID
        const deletedBook = await Book.findByIdAndDelete(id);
        
        if(!deletedBook) {
            return response.status(404).send("Book not found");
        }
        
        return response.status(200).send({ message: "Book deleted successfully" });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

export default router;