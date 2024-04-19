const PublisherSubmission = require('../models/publisherSubmissionModel');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const Book = require('../models/bookModel');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const { sequelize } = require('../configs/dbConfig');

const publisherSubmissionController = {
  submitRequest: async (req, res) => {
    try {
      // Extract the user ID from the JWT token in the request headers
      const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format "Bearer <token>"

      console.log(token)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;


      console.log('Req Files', req.files)
      // Extract file data from the request
      const bookFile = req.files.epub[0];
      const coverImageFile = req.files.coverImage[0];
      const copyrightFile = req.files.copyright[0];


      // Upload EPUB file to Cloudinary
      const bookUpload = await cloudinary.uploader.upload(bookFile.path, {
        folder: 'bbookstore/books', // Folder in Cloudinary to store EPUB files
        resource_type: 'raw',
      });

      const coverImageUpload = await cloudinary.uploader.upload(coverImageFile.path, {
        folder: 'bbookstore/coverImages', 
        resource_type: 'auto'
      });

      const copyrightUpload = await cloudinary.uploader.upload(copyrightFile.path, {
        folder: 'bbookstore/copyrightFiles', 
        resource_type: 'auto'
      });

       // Parse genres from the request body
      const genres = req.body.Genre.split(',').map(genre => genre.trim());

      // Create the publisher submission with the associated user ID
      const newSubmission = await PublisherSubmission.create({
        UserID: userId,
        BookTitle: req.body.BookTitle,
        Author: req.body.Author,
        Synopsis: req.body.Synopsis,
        Genre: genres, // Assign parsed genres
        Price: req.body.Price,
        BookURL: bookUpload.secure_url, 
        CoverImageURL: coverImageUpload.secure_url,
        CopyrightURL: copyrightUpload.secure_url,
        PublisherContact: req.body.PublisherContact
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
    const { requestStatus } = req.body;
    try {
      const submission = await PublisherSubmission.findByPk(submissionId);
      if (!submission) {
        return res.status(404).json({ error: 'Submission Request not found' });
      }
      // Change request status to 'approved'
      submission.requestStatus = requestStatus;
      await submission.save();


      if (requestStatus === 'approved'){
        // Change user role to 'publisher'
        const user = await User.findByPk(submission.UserID);
        if (!user) {
          return res.status(404).json({ error: 'Cannot Find ID of User who submitted' });
        }
        user.Role = 'publisher';
        await user.save();

        // Add the book to the book table
        const newBook = await Book.create({
          Title: submission.BookTitle,
          Author: submission.Author,
          Genre: submission.Genre, // Assuming Genre is an array of strings
          Synopsis: submission.Synopsis,
          Price: submission.Price,
          BookURL: submission.BookURL, 
          CoverImageURL: submission.CoverImageURL,
          CopyrightURL: submission.CopyrightURL,
          PublisherContact: submission.PublisherContact
        });
      }


      res.status(200).json({ message: 'Submission approved successfully' });
    } catch (error) {
      console.error('Error approving submission:', error);
      res.status(500).json({ error: 'Error approving submission' });
    }
  },

  declineRequest: async (req, res) => {
    const submissionId = req.params.id;
    const { requestStatus } = req.body;
    try {
        const submission = await PublisherSubmission.findByPk(submissionId);
        if (!submission) {
            return res.status(404).json({ error: 'Submission Request not found' });
        }
        // Change request status to 'declined'
        submission.requestStatus = requestStatus;
        await submission.save();

        res.status(200).json({ message: 'Submission declined successfully' });
    } catch (error) {
        console.error('Error declining submission:', error);
        res.status(500).json({ error: 'Error declining submission' });
    }
  },

  getAllRequests: async (req, res) => {
    try {
      const allSubmissions = await PublisherSubmission.findAll({
        include: User // Include associated user data
      });
      res.status(200).json(allSubmissions);
    } catch (error) {
      console.error('Error fetching all submissions:', error);
      res.status(500).json({ error: 'Error fetching all submissions' });
    }
  },

  getRequestById: async (req, res) => {
    const submissionId = req.params.id;
    try {
      const submission = await PublisherSubmission.findByPk(submissionId, {
        include: User // Include associated user data
      });
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      res.status(200).json(submission);
    } catch (error) {
      console.error('Error fetching submission by ID:', error);
      res.status(500).json({ error: 'Error fetching submission by ID' });
    }
  },

  getBooksOnSale: async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    try {
        // Verify and decode JWT token to get user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your-secret-key' with your actual secret key
        const userId = decoded.userId;
        
        
        
            // Fetch all approved submissions for the current publisher
            const submissions = await PublisherSubmission.findAll({
              where: { UserID: userId, requestStatus: 'approved' }
          });

          // Initialize an object to store book sales data
          const booksOnSale = {};

          // Iterate through each approved submission
          for (const submission of submissions) {
              const bookTitle = submission.BookTitle;

              // Find transactions where the book title matches the submission's book title
              const transactions = await Transaction.findAll({
                  where: {
                      TransactionStatus: 'completed',
                      // Using sequelize.fn and sequelize.col to access and query JSON data in CartItems
                      CartItems: sequelize.where(
                          sequelize.fn('JSON_CONTAINS', sequelize.col('CartItems'), JSON.stringify({ Name: bookTitle })),
                          true
                      )
                  }
              });

              // Count the number of transactions (i.e., books sold)
              const numSold = transactions.length;

              // Add the book to the booksOnSale object with the number sold
              booksOnSale[bookTitle] = numSold;
          }

          res.status(200).json(booksOnSale);
      } catch (error) {
          console.error('Error fetching books on sale:', error);
          res.status(500).json({ error: 'Error fetching books on sale' });
      }
  }
};

module.exports = publisherSubmissionController;
