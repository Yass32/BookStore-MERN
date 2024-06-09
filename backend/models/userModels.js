import mongoose from "mongoose";

// Define a schema for a 'book' collection using mongoose.Schema.
const userSchema = mongoose.Schema(
    {
        // Define a 'username' field of type String, which is required.
        username: {
            type: String,
            required: true,
        },
        // Define a 'password' field of type String, which is required.
        password: {
            type: String,
            required: true,
        }
    }
) 

// Create a Mongoose model called 'User' based on the 'bookSchema'
export const User = mongoose.model("User", userSchema);
