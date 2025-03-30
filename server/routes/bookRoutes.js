import express from 'express';
import {Book} from '../models/bookModels.js';
import {User} from '../models/userModels.js';

const router = express.Router();

//Route for get all books & user from database
router.get("/", async (request, response) => {
    try {
        // Use the Book model to find all documents in the 'books' collection
        const books = await Book.find();

        // Use the User model to find all documents in the 'users' collection
        const user = await User.find();

        // Send a 200 OK response with a JSON object data
        return response.status(200).json({ 
            user: user, 
            books: books //Array of book document
        });

    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

//Route to register
router.post('/register', async (request, response) => {
    try {
        console.log(request.body);

        // Destructure the fields from the parsed JSON data in request.body.
        const {username, password} = request.body;

        //checks if the fields are missing in the request body
        if (!username || !password) {
            return response.status(400).json("Please provide all the required fields");
        }

        //creates a new user object with the data from the request body
        const newUser = { username, password };

        //uses the User model's create method to save the new book to the database
        const user = await User.create(newUser);

        //If  user is successfully created, a 201 Created response with the new book object is sent
        return response.status(201).json(user);
    }
    catch(error) {
        console.log(error.message);
        return response.status(500).json({ message: error.message });
    }
})

//Route to login
router.post('/', async (request, response) => {
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
            return response.status(400).send("Invalid username or password");
        }

        // If user is found, send a 200 response with the user details
        return response.status(200).json(loggedUser);
    }
    catch(error) {
        console.log(error.message);
        return response.status(500).json({ message: error.message });
    }
})

//Route to add a new Book
router.post('/:userId', async (request, response) => {
    try {
        console.log(request.body);

        const { userId } = request.params;

        // Destructure the fields from the parsed JSON data in request.body.
        const {title, author, publishedYear} = request.body;

        //checks if the fields are missing in the request body
        if (!title || !author || !publishedYear) {
            return response.status(400).send("Please provide all the required fields");
        }

        //creates a new book object with the data from the request body
        const newBook = { title, author, publishedYear, userId };

        //uses the Book model's create method to save the new book to the database
        const book = await Book.create(newBook);

        //If the book is successfully created, it sends a 201 Created response with the new book object
        return response.status(201).send({ message: 'Book added successfully', book: book });
    }
    catch(error) {
        console.log(error.message);
        return response.status(500).json({ message: error.message });
    }
})

//Route for get all books from database
router.get("/:userId", async (request, response) => {
    try {
        const { userId } = request.params;

        // Use the Book model to find all documents in the 'books' collection
        const books = await Book.find({userId});

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

//Route to read a book in database
router.get("/:userId/:_id", async (request, response) => {
    try {
        // Extract userId and bookId from the request parameters
        const { userId, _id } = request.params;

        //Find the book in the database using the extracted book and userID
        const book = await Book.findOne({_id, userId});

        // Send a 200 OK response with a JSON data
        return response.status(200).json(book);
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

// PUT route to update a book with a given ID
router.put("/:userId/:_id", async (request, response) => {
    try {

        // Extract userId and bookId from the request parameters
        const { userId, _id } = request.params;

        // Destructure the fields from the parsed JSON data in request.body.
        const {title, author, publishedYear} = request.body;

        // Validation
        if (!title || !author || !publishedYear) {
            return response.status(400).send("Please provide all the required fields");
        }

        //Use method to find the book by _id and user, ensuring that the book being updated belongs to the specified user. 
        //Update it with the data from the request body. The { new: true } option ensures the updated document is returned.
        const updatedBook = await Book.findOneAndUpdate(
            { _id, userId }, 
            { title, author, publishedYear },
            { new: true } // To return the updated document
        );

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

router.delete("/:userId/:_id", async (request, response) => {
    try {
        // Extract userId and bookId from the request parameters
        const { userId, _id } = request.params;

        // Use method to find and delete the book by _id and user, ensuring that the book being deleted belongs to the specified user
        const deletedBook = await Book.findOneAndDelete({ _id, userId });
        
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