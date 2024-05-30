import mongoose from "mongoose";

// Define a schema for a 'book' collection using mongoose.Schema.
const bookSchema = mongoose.Schema(
    {
        // Define a 'title' field of type String, which is required.
        title: {
            type: String,
            required: true,
        },
        // Define a 'author' field of type String, which is required.
        author: {
            type: String,
            required: true,
        },
        // Define a 'publishedYear' field of type String, which is required.
        publishedYear: {
            type: Number,
            required: true,
        }
    },
    {
        // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields.
        timestamps: true,
    }
)

// Create a Mongoose model called 'Book' based on the 'bookSchema'
export const Book = mongoose.model("Book", bookSchema);