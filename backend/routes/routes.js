const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userProfile = require('../controllers/userProfile');
const userBooksController = require('../controllers/userBooksController');
const adminController = require('../controllers/adminController');
const bookController = require('../controllers/bookController');
const favoriteController = require('../controllers/favoriteController');
const wishlistController = require('../controllers/wishlistController');
const publisherSubmissionController = require('../controllers/publisherSubmissionController');
const publisherCatalogController = require('../controllers/publisherCatalogController');
const transactionController = require('../controllers/transactionController');
const cartController = require('../controllers/cartController');

// User routes
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// User profile routes
router.post('/user-profiles', userProfile.createProfile);
router.get('/user-profiles/:id', userProfile.getProfileById);
router.put('/user-profiles/:id', userProfile.updateProfile);
router.delete('/user-profiles/:id', userProfile.deleteProfile);

// User books routes
router.post('/user-books', userBooksController.createUserBook);
router.get('/user-books/:id', userBooksController.getUserBookById);
router.put('/user-books/:id', userBooksController.updateUserBook);
router.delete('/user-books/:id', userBooksController.deleteUserBook);

// Admin routes
router.post('/admins', adminController.createAdmin);
router.get('/admins/:id', adminController.getAdminById);
router.put('/admins/:id', adminController.updateAdmin);
router.delete('/admins/:id', adminController.deleteAdmin);

// Book routes
router.post('/books', bookController.createBook);
router.get('/books/:id', bookController.getBookById);
router.get('/books', bookController.getAllBooks);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

// Favorite routes
router.post('/favorites', favoriteController.createFavorite);
router.get('/favorites/:id', favoriteController.getFavoriteById);
router.put('/favorites/:id', favoriteController.updateFavorite);
router.delete('/favorites/:id', favoriteController.deleteFavorite);

// Wishlist routes
router.post('/wishlist/add', wishlistController.addToWishlist);
router.delete('/wishlist/remove', wishlistController.removeFromWishlist);

// Cart routes
router.post('/cart/add', cartController.addToCart);
router.delete('/cart/remove', cartController.removeFromCart);
router.get('/cart', cartController.getCartItems);

// Publisher submission routes
router.post('/publisher-submissions', publisherSubmissionController.createPublisherSubmission);
router.get('/publisher-submissions/:id', publisherSubmissionController.getPublisherSubmissionById);
router.put('/publisher-submissions/:id', publisherSubmissionController.updatePublisherSubmission);
router.delete('/publisher-submissions/:id', publisherSubmissionController.deletePublisherSubmission);

// Publisher catalog routes
router.post('/publisher-catalogs', publisherCatalogController.createPublisherCatalog);
router.get('/publisher-catalogs/:id', publisherCatalogController.getPublisherCatalogById);
router.put('/publisher-catalogs/:id', publisherCatalogController.updatePublisherCatalog);
router.delete('/publisher-catalogs/:id', publisherCatalogController.deletePublisherCatalog);

// Transaction routes
router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/:id', transactionController.getTransactionById);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);

module.exports = router;
