const Wishlist = require('../models/wishListModel');
const jwt = require('jsonwebtoken');

const wishlistController = {
  addToWishlist: async (req, res) => {
    try {
      // Extract the user ID from the JWT token in the request headers
      const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format "Bearer <token>"

      console.log(token)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;

      const { bookId } = req.body;
      
      // Check if the book is already in the wishlist
      const existingWishlistItem = await Wishlist.findOne({ where: { UserID: userId, BookID: bookId } });

      if (existingWishlistItem) {
        return res.status(400).json({ error: 'Book already exists in the wishlist' });
      }

      // Create a new wishlist item
      const newWishlistItem = await Wishlist.create({ UserID: userId, BookID: bookId });
      res.status(201).json(newWishlistItem);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      res.status(500).json({ error: 'Error adding to wishlist' });
    }
  },

  removeFromWishlist: async (req, res) => {
    const { userId, bookId } = req.body;
    try {
      // Find the wishlist item to remove
      const wishlistItem = await Wishlist.findOne({ where: { UserID: userId, BookID: bookId } });
      if (!wishlistItem) {
        return res.status(404).json({ error: 'Wishlist item not found' });
      }

      // Delete the wishlist item
      await wishlistItem.destroy();
      res.status(200).json({ message: 'Book removed from wishlist successfully' });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ error: 'Error removing from wishlist' });
    }
  }
};

module.exports = wishlistController;
