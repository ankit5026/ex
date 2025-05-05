const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://admin:admin123@cluster00.mongodb.net/idurar-db?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define the User schema and model
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
}));

// Function to create the admin user
async function createAdminUser() {
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  const admin = new User({
    email: 'admin@admin.com',
    password: hashedPassword,
  });

  await admin.save(); // Save the admin user to the database
  console.log('Admin user created!');
  mongoose.connection.close(); // Close the database connection
}

createAdminUser();
