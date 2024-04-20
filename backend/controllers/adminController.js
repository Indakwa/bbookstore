const Admin = require('../models/admin');
const Book = require('../models/bookModel');
const Transaction = require('../models/transactionModel');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../configs/dbConfig');

// Controller for handling CRUD operations for Admin
const adminController = {
  // Admin login
  loginAdmin: async (req, res) => {
    const { Email, Password } = req.body;
    try {
      // Find admin by email
      const admin = await Admin.findOne({ where: { Email: Email } });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check if password is correct
      const validPassword = (Password === admin.Password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ AdminID: admin.AdminID, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in admin:', error);
      res.status(500).json({ error: 'Error logging in admin' });
    }
  },

  // Update admin
  updateAdmin: async (req, res) => {
    const adminId = req.params.id;
    try {
      const [updatedRows] = await Admin.update(req.body, {
        where: { AdminID: adminId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
      console.error('Error updating admin:', error);
      res.status(500).json({ error: 'Error updating admin' });
    }
  },

  // Get admin details
  getAdmin: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      // Verify and decode JWT token to get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your-secret-key' with your actual secret key
      const adminId = decoded.AdminID; // Adjust to 'adminId'
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      const { AdminID, Username, Email, role } = admin;
      res.status(200).json({ AdminID, Username, Email, role });
    } catch (error) {
      console.error('Error fetching admin:', error);
      res.status(500).json({ error: 'Error fetching admin' });
    }
  },

  getBooksInventory: async (req, res) => {
    try {
        
            // Fetch all books
            const books = await Book.findAll();
            if (!books || books.length === 0) {
                return res.status(404).json({ error: 'No Books found' });
            }

          // Initialize an object to store book sales data
          const booksInventory = {};

          // Iterate through each book
          for (const book of books) {
              const bookTitle = book.Title;
              const bookAuthor = book.Author;
              const publisherContact = book.PublisherContact;
              const bookPrice = book.Price;

              // Find transactions where the book title matches the book title
              const transactions = await Transaction.findAll({
                  where: {
                      TransactionStatus: 'completed',
                      CartItems: sequelize.where(
                          sequelize.fn('JSON_CONTAINS', sequelize.col('CartItems'), JSON.stringify({ Name: bookTitle })),
                          true
                      )
                  }
              });

              // Count the number of transactions (i.e., books sold)
              const numSold = transactions.length;

              // Add the book to the booksOnSale object with the number sold and price
              booksInventory[bookTitle] = { 
                Title: bookTitle,
                Author: bookAuthor,
                Contact: publisherContact,
                price: bookPrice,
                Number_Sold: numSold, 
              };
          }

          res.status(200).json(booksInventory);
      } catch (error) {
          console.error('Error fetching books', error);
          res.status(500).json({ error: 'Error fetching books' });
      }
  }


};

module.exports = adminController;
