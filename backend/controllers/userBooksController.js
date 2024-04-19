const UserBooks = require('../models/userBooks');
const jwt = require('jsonwebtoken');
const Book = require('../models/bookModel');

// Controller for handling CRUD operations for UserBooks
const userBooksController = {
  // Create a new user book entry
  createUserBook: async (req, res) => {
    try {
      const newUserBook = await UserBooks.create(req.body);
      res.status(201).json(newUserBook);
    } catch (error) {
      console.error('Error creating user book:', error);
      res.status(500).json({ error: 'Error creating user book' });
    }
  },

  // Fetch user books by UserID
  getUserBooksByUserId: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from request headers
    try {
      // Verify and decode JWT token to get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your-secret-key' with your actual secret key
      const userId = decoded.userId;
  
      // Now fetch user books based on the user ID, including associated book details
      const userBooks = await UserBooks.findAll({ 
        where: { UserID: userId },
        include: Book // Include Book model to get associated book details
      });
      res.status(200).json(userBooks);
    } catch (error) {
      console.error('Error fetching user books:', error);
      res.status(500).json({ error: 'Error fetching user books' });
    }
  },

  // Update user book entry
  updateUserBook: async (req, res) => {
    const userBookId = req.params.id;
    try {
      const [updatedRows] = await UserBooks.update(req.body, {
        where: { UserBookID: userBookId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'User book entry not found' });
      }
      res.status(200).json({ message: 'User book entry updated successfully' });
    } catch (error) {
      console.error('Error updating user book entry:', error);
      res.status(500).json({ error: 'Error updating user book entry' });
    }
  },

  // Delete user book entry
  deleteUserBook: async (req, res) => {
    const userBookId = req.params.id;
    try {
      const deletedRows = await UserBooks.destroy({
        where: { UserBookID: userBookId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'User book entry not found' });
      }
      res.status(200).json({ message: 'User book entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting user book entry:', error);
      res.status(500).json({ error: 'Error deleting user book entry' });
    }
  }
};

module.exports = userBooksController;
