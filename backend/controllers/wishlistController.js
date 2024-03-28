const Wishlist = require('../models/wishListModel');

const wishlistController = {
  createWishlistItem: async (req, res) => {
    try {
      const newWishlistItem = await Wishlist.create(req.body);
      res.status(201).json(newWishlistItem);
    } catch (error) {
      console.error('Error creating wishlist item:', error);
      res.status(500).json({ error: 'Error creating wishlist item' });
    }
  },

  getWishlistItemById: async (req, res) => {
    const wishlistItemId = req.params.id;
    try {
      const wishlistItem = await Wishlist.findByPk(wishlistItemId);
      if (!wishlistItem) {
        return res.status(404).json({ error: 'Wishlist item not found' });
      }
      res.status(200).json(wishlistItem);
    } catch (error) {
      console.error('Error fetching wishlist item:', error);
      res.status(500).json({ error: 'Error fetching wishlist item' });
    }
  },

  updateWishlistItem: async (req, res) => {
    const wishlistItemId = req.params.id;
    try {
      const [updatedRows] = await Wishlist.update(req.body, {
        where: { WishlistID: wishlistItemId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Wishlist item not found' });
      }
      res.status(200).json({ message: 'Wishlist item updated successfully' });
    } catch (error) {
      console.error('Error updating wishlist item:', error);
      res.status(500).json({ error: 'Error updating wishlist item' });
    }
  },

  deleteWishlistItem: async (req, res) => {
    const wishlistItemId = req.params.id;
    try {
      const deletedRows = await Wishlist.destroy({
        where: { WishlistID: wishlistItemId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Wishlist item not found' });
      }
      res.status(200).json({ message: 'Wishlist item deleted successfully' });
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
      res.status(500).json({ error: 'Error deleting wishlist item' });
    }
  }
};

module.exports = wishlistController;
