import mongoose from 'mongoose';

// Define the schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },

    lastname: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },

    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
        lowercase: true, // Converts email to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Enforces a minimum length
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Pre-save middleware to hash the password (if needed)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Create the model
const User = mongoose.model('User', userSchema);

// Export the model
export default User;
