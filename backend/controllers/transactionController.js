const Transaction = require('../models/transactionModel');
const Book = require('../models/bookModel');
const UserBook = require('../models/userBooks');


const transactionController = {

  getTransactionById: async (req, res) => {
    const transactionId = req.params.id;
    try {
      const transaction = await Transaction.findByPk(transactionId);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
       // Log the value of the CartItems field before parsing
       console.log('CartItems value:', transaction.CartItems);

      res.status(200).json(transaction);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      res.status(500).json({ error: 'Error fetching transaction' });
    }
  },

  updateTransactionStatus: async (req, res) => {
    const transactionId = req.params.id;
    const { transactionStatus } = req.body;

    try {
      // Find the transaction by its ID
      const transaction = await Transaction.findByPk(transactionId);

      // If transaction not found, return error
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      // Update the transaction status
      transaction.TransactionStatus = transactionStatus;

      // Save the updated transaction
      await transaction.save();

      // If transaction status is 'completed', add books to userbook
      if (transactionStatus === 'completed') {
        // Parse the cart items JSON and extract book details
        const cartItems = transaction.CartItems;

        // Get the user ID from the transaction
        const userId = transaction.UserID;

        // Create userbook entries for each book in the cart items
        for (const item of cartItems) {
          const bookName = item.Name;

          // Assuming there's a method to find the book ID based on its name
          const book = await Book.findOne({ where: { Title: bookName } });

          // Create a userbook entry
          await UserBook.create({
            UserID: userId,
            BookID: book.BookID,
            PurchaseDate: transaction.TransactionDate,
            ReadingProgress: 0 // Assuming starting reading progress is 0%
          });
        }
      }

      // Send success response
      res.status(200).json({ message: 'Transaction status updated successfully' });
    } catch (error) {
      console.error('Error updating transaction status:', error);
      res.status(500).json({ error: 'Error updating transaction status' });
    }
  }


};

module.exports = transactionController;
