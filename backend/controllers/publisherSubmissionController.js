const PublisherSubmission = require('../models/publisherSubmissionModel');

const publisherSubmissionController = {
  createPublisherSubmission: async (req, res) => {
    try {
      const newSubmission = await PublisherSubmission.create(req.body);
      res.status(201).json(newSubmission);
    } catch (error) {
      console.error('Error creating publisher submission:', error);
      res.status(500).json({ error: 'Error creating publisher submission' });
    }
  },

  getPublisherSubmissionById: async (req, res) => {
    const submissionId = req.params.id;
    try {
      const submission = await PublisherSubmission.findByPk(submissionId);
      if (!submission) {
        return res.status(404).json({ error: 'Publisher submission not found' });
      }
      res.status(200).json(submission);
    } catch (error) {
      console.error('Error fetching publisher submission:', error);
      res.status(500).json({ error: 'Error fetching publisher submission' });
    }
  },

  updatePublisherSubmission: async (req, res) => {
    const submissionId = req.params.id;
    try {
      const [updatedRows] = await PublisherSubmission.update(req.body, {
        where: { SubmissionID: submissionId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Publisher submission not found' });
      }
      res.status(200).json({ message: 'Publisher submission updated successfully' });
    } catch (error) {
      console.error('Error updating publisher submission:', error);
      res.status(500).json({ error: 'Error updating publisher submission' });
    }
  },

  deletePublisherSubmission: async (req, res) => {
    const submissionId = req.params.id;
    try {
      const deletedRows = await PublisherSubmission.destroy({
        where: { SubmissionID: submissionId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Publisher submission not found' });
      }
      res.status(200).json({ message: 'Publisher submission deleted successfully' });
    } catch (error) {
      console.error('Error deleting publisher submission:', error);
      res.status(500).json({ error: 'Error deleting publisher submission' });
    }
  }
};

module.exports = publisherSubmissionController;
