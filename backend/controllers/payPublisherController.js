// payPublisherController.js

const PayPublisher = require('../models/payPublisherModel');

const payPublisherController = {
  // Update payPublisher status
  updatePayPublisherStatus: async (req, res) => {
    const payPublisherId = req.params.id;
    const { status } = req.body;
    try {
      const payPublisher = await PayPublisher.findByPk(payPublisherId);
      if (!payPublisher) {
        return res.status(404).json({ error: 'payPublisher not found' });
      }
      // Update the status
      payPublisher.Status = status;
      await payPublisher.save();
      res.status(200).json({ message: 'payPublisher status updated successfully' });
    } catch (error) {
      console.error('Error updating payPublisher status:', error);
      res.status(500).json({ error: 'Error updating payPublisher status' });
    }
  },

  // Get all pay publishers
  getAllPayPublishers: async (req, res) => {
    try {
      const payPublishers = await PayPublisher.findAll();
      res.status(200).json(payPublishers);
    } catch (error) {
      console.error('Error fetching pay publishers:', error);
      res.status(500).json({ error: 'Error fetching pay publishers' });
    }
  }
};

module.exports = payPublisherController;
