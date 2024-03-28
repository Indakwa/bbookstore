const Transaction = require('../models/transactionModel');

const transactionController = {
  createTransaction: async (req, res) => {
    try {
      const newTransaction = await Transaction.create(req.body);
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Error creating transaction' });
    }
  },

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

  updateTransaction: async (req, res) => {
    const transactionId = req.params.id;
    try {
      const [updatedRows] = await Transaction.update(req.body, {
        where: { TransactionID: transactionId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(200).json({ message: 'Transaction updated successfully' });
    } catch (error) {
      console.error('Error updating transaction:', error);
      res.status(500).json({ error: 'Error updating transaction' });
    }
  },

  deleteTransaction: async (req, res) => {
    const transactionId = req.params.id;
    try {
      const deletedRows = await Transaction.destroy({
        where: { TransactionID: transactionId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ error: 'Error deleting transaction' });
    }
  }
};

module.exports = transactionController;
