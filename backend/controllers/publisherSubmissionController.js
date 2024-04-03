const PublisherSubmission = require('../models/publisherSubmissionModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const publisherSubmissionController = {
  submitRequest: async (req, res) => {
    try {
      // Extract the user ID from the JWT token in the request headers
      const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format "Bearer <token>"

      console.log(token)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;

      // Create the publisher submission with the associated user ID
      const newSubmission = await PublisherSubmission.create({
        UserID: userId,
        BookTitle: req.body.BookTitle,
        Author: req.body.Author,
        Synopsis: req.body.Synopsis,
        Genre: req.body.Genre,
        Price: req.body.Price
      });

      res.status(201).json(newSubmission);
    } catch (error) {
      console.error('Error submitting publisher request:', error);
      res.status(500).json({ error: 'Error submitting publisher request' });
    }
  },

  editRequest: async (req, res) => {
    const submissionId = req.params.id;
    try {
      const submission = await PublisherSubmission.findByPk(submissionId);
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      await submission.update(req.body);
      res.status(200).json({ message: 'Submission updated successfully' });
    } catch (error) {
      console.error('Error updating submission:', error);
      res.status(500).json({ error: 'Error updating submission' });
    }
  },

  deleteRequest: async (req, res) => {
    const submissionId = req.params.id;
    try {
      const deletedRows = await PublisherSubmission.destroy({
        where: { SubmissionID: submissionId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (error) {
      console.error('Error deleting submission:', error);
      res.status(500).json({ error: 'Error deleting submission' });
    }
  },

  approveRequest: async (req, res) => {
    const submissionId = req.params.id;
    try {
      const submission = await PublisherSubmission.findByPk(submissionId);
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      // Change request status to 'approved'
      submission.requestStatus = 'approved';
      await submission.save();

      // Change user role to 'publisher'
      const user = await User.findByPk(submission.UserID);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.Role = 'publisher';
      await user.save();

      res.status(200).json({ message: 'Submission approved successfully' });
    } catch (error) {
      console.error('Error approving submission:', error);
      res.status(500).json({ error: 'Error approving submission' });
    }
  }
};

module.exports = publisherSubmissionController;
