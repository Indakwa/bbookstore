const Admin = require('../models/admin');

// Controller for handling CRUD operations for Admin
const adminController = {
  // Create a new admin
  createAdmin: async (req, res) => {
    try {
      const newAdmin = await Admin.create(req.body);
      res.status(201).json(newAdmin);
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ error: 'Error creating admin' });
    }
  },

  // Get admin by ID
  getAdminById: async (req, res) => {
    const adminId = req.params.id;
    try {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.status(200).json(admin);
    } catch (error) {
      console.error('Error fetching admin:', error);
      res.status(500).json({ error: 'Error fetching admin' });
    }
  },

  // Update admin
  updateAdmin: async (req, res) => {
    const adminId = req.params.id;
    try {
      const [updatedRows] = await Admin.update(req.body, {
        where: { AdminID: adminId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
      console.error('Error updating admin:', error);
      res.status(500).json({ error: 'Error updating admin' });
    }
  },

  // Delete admin
  deleteAdmin: async (req, res) => {
    const adminId = req.params.id;
    try {
      const deletedRows = await Admin.destroy({
        where: { AdminID: adminId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      console.error('Error deleting admin:', error);
      res.status(500).json({ error: 'Error deleting admin' });
    }
  }
};

module.exports = adminController;
