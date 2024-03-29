const Book = require('../models/bookModel');

// Controller for handling CRUD operations for Book
const bookController = {
  // Create a new book
  createBook: async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ error: 'Error creating book' });
    }
  },

  // Get book by ID
  getBookById: async (req, res) => {
    const bookId = req.params.id;
    try {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      console.error('Error fetching book:', error);
      res.status(500).json({ error: 'Error fetching book' });
    }
  },


  getAllBooks: async (req, res) => {
    try {
        const books = await Book.findAll();
        if (!books || books.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
},

  // Update book
  updateBook: async (req, res) => {
    const bookId = req.params.id;
    try {
      const [updatedRows] = await Book.update(req.body, {
        where: { BookID: bookId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Error updating book' });
    }
  },

  // Delete book
  deleteBook: async (req, res) => {
    const bookId = req.params.id;
    try {
      const deletedRows = await Book.destroy({
        where: { BookID: bookId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'Error deleting book' });
    }
  }
};

module.exports = bookController;
