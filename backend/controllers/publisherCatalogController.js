const PublisherCatalog = require('../models/publisherCatalogModel');

const publisherCatalogController = {
  createPublisherCatalog: async (req, res) => {
    try {
      const newPublisherCatalog = await PublisherCatalog.create(req.body);
      res.status(201).json(newPublisherCatalog);
    } catch (error) {
      console.error('Error creating publisher catalog:', error);
      res.status(500).json({ error: 'Error creating publisher catalog' });
    }
  },

  getPublisherCatalogById: async (req, res) => {
    const catalogId = req.params.id;
    try {
      const catalog = await PublisherCatalog.findByPk(catalogId);
      if (!catalog) {
        return res.status(404).json({ error: 'Publisher catalog not found' });
      }
      res.status(200).json(catalog);
    } catch (error) {
      console.error('Error fetching publisher catalog:', error);
      res.status(500).json({ error: 'Error fetching publisher catalog' });
    }
  },

  updatePublisherCatalog: async (req, res) => {
    const catalogId = req.params.id;
    try {
      const [updatedRows] = await PublisherCatalog.update(req.body, {
        where: { CatalogID: catalogId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Publisher catalog not found' });
      }
      res.status(200).json({ message: 'Publisher catalog updated successfully' });
    } catch (error) {
      console.error('Error updating publisher catalog:', error);
      res.status(500).json({ error: 'Error updating publisher catalog' });
    }
  },

  deletePublisherCatalog: async (req, res) => {
    const catalogId = req.params.id;
    try {
      const deletedRows = await PublisherCatalog.destroy({
        where: { CatalogID: catalogId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Publisher catalog not found' });
      }
      res.status(200).json({ message: 'Publisher catalog deleted successfully' });
    } catch (error) {
      console.error('Error deleting publisher catalog:', error);
      res.status(500).json({ error: 'Error deleting publisher catalog' });
    }
  }
};

module.exports = publisherCatalogController;
