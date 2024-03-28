const Favorite = require('../models/favoriteModel');

const favoriteController = {
  // Create a new favorite entry
  createFavorite: async (req, res) => {
    try {
      const newFavorite = await Favorite.create(req.body);
      res.status(201).json(newFavorite);
    } catch (error) {
      console.error('Error creating favorite:', error);
      res.status(500).json({ error: 'Error creating favorite' });
    }
  },

  // Get favorite by ID
  getFavoriteById: async (req, res) => {
    const favoriteId = req.params.id;
    try {
      const favorite = await Favorite.findByPk(favoriteId);
      if (!favorite) {
        return res.status(404).json({ error: 'Favorite not found' });
      }
      res.status(200).json(favorite);
    } catch (error) {
      console.error('Error fetching favorite:', error);
      res.status(500).json({ error: 'Error fetching favorite' });
    }
  },

  // Update favorite
  updateFavorite: async (req, res) => {
    const favoriteId = req.params.id;
    try {
      const [updatedRows] = await Favorite.update(req.body, {
        where: { FavoriteID: favoriteId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Favorite not found' });
      }
      res.status(200).json({ message: 'Favorite updated successfully' });
    } catch (error) {
      console.error('Error updating favorite:', error);
      res.status(500).json({ error: 'Error updating favorite' });
    }
  },

  // Delete favorite
  deleteFavorite: async (req, res) => {
    const favoriteId = req.params.id;
    try {
      const deletedRows = await Favorite.destroy({
        where: { FavoriteID: favoriteId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Favorite not found' });
      }
      res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
      console.error('Error deleting favorite:', error);
      res.status(500).json({ error: 'Error deleting favorite' });
    }
  }
};

module.exports = favoriteController;
