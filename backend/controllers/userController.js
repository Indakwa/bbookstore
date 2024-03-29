const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

  // Controller for handling CRUD operations for User
  const userController = {
  // Create a new user and send back a JWT token
  createUser: async (req, res) => {
    try {
      const { Username, Email, Password } = req.body;

      // Check if the email already exists in the database
      const existingUser = await User.findOne({ where: { Email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email address is already registered' });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the saltRounds

      // Set the default role to 'reader' if not provided in the request body
      const newUser = await User.create({
        Username,
        Email,
        Password: hashedPassword, // Store the hashed password in the database
        Role: req.body.Role || 'reader'
      });

      // Generate JWT token
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1d' // Token expires in 1 day
      });

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' && error.fields && error.fields.UC_Email) {
        return res.status(400).json({ error: 'Email address is already registered' });
      }
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } ,
  
  // Login user
  loginUser: async (req, res) => {
    const { Email, Password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ where: { Email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d' // Token expires in 1 day
      });

      res.status(200).json({ user, token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Error logging in user' });
    }
  },

    // Get user by ID
    getUserById: async (req, res) => {
      const userId = req.params.id;
      try {
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
      }
    },

    getAllUsers: async (req, res) => {
      try {
          const users = await User.findAll();
          if (!users || users.length === 0) {
              return res.status(404).json({ error: 'No users found' });
          }
          res.status(200).json(users);
      } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ error: 'Error fetching users' });
      }
  },


    // Update user
    updateUser: async (req, res) => {
      const userId = req.params.id;
      try {
        const [updatedRows] = await User.update(req.body, {
          where: { UserID: userId }
        });
        if (updatedRows === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
      }
    },

    // Delete user
    deleteUser: async (req, res) => {
      const userId = req.params.id;
      try {
        const deletedRows = await User.destroy({
          where: { UserID: userId }
        });
        if (deletedRows === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
      }
    }
  };

  module.exports = userController;
