const Transaction = require('../models/transactionModel');

const transactionController = {

  getTransactionById: async (req, res) => {
    const transactionId = req.params.id;
    try {
      const transaction = await Transaction.findByPk(transactionId);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
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

      // Send success response
      res.status(200).json({ message: 'Transaction status updated successfully' });
    } catch (error) {
      console.error('Error updating transaction status:', error);
      res.status(500).json({ error: 'Error updating transaction status' });
    }
  }


};

module.exports = transactionController;
