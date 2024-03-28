const UserProfile = require('../models/userProfile');

// Controller for handling CRUD operations for UserProfile
const userProfileController = {
  // Create a new user profile
  createProfile: async (req, res) => {
    try {
      const newProfile = await UserProfile.create(req.body);
      res.status(201).json(newProfile);
    } catch (error) {
      console.error('Error creating user profile:', error);
      res.status(500).json({ error: 'Error creating user profile' });
    }
  },

  // Get user profile by ID
  getProfileById: async (req, res) => {
    const profileId = req.params.id;
    try {
      const profile = await UserProfile.findByPk(profileId);
      if (!profile) {
        return res.status(404).json({ error: 'User profile not found' });
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Error fetching user profile' });
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    const profileId = req.params.id;
    try {
      const [updatedRows] = await UserProfile.update(req.body, {
        where: { ProfileID: profileId }
      });
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'User profile not found' });
      }
      res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Error updating user profile' });
    }
  },

  // Delete user profile
  deleteProfile: async (req, res) => {
    const profileId = req.params.id;
    try {
      const deletedRows = await UserProfile.destroy({
        where: { ProfileID: profileId }
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'User profile not found' });
      }
      res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting user profile:', error);
      res.status(500).json({ error: 'Error deleting user profile' });
    }
  }
};

module.exports = userProfileController;
