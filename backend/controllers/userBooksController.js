const UserBooks = require('../models/userBooks');

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

  // Get user book entry by ID
  getUserBookById: async (req, res) => {
    const userBookId = req.params.id;
    try {
      const userBook = await UserBooks.findByPk(userBookId);
      if (!userBook) {
        return res.status(404).json({ error: 'User book entry not found' });
      }
      res.status(200).json(userBook);
    } catch (error) {
      console.error('Error fetching user book entry:', error);
      res.status(500).json({ error: 'Error fetching user book entry' });
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
