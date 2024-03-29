const Cart = require('../models/cartModel');

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { userId, bookId } = req.body;
      
      // Check if the item is already in the cart
      const existingCartItem = await Cart.findOne({ where: { UserID: userId, BookID: bookId } });
      if (existingCartItem) {
        return res.status(400).json({ error: 'Item already exists in the cart' });
      }

      // Create a new cart item
      const newCartItem = await Cart.create({ UserID: userId, BookID: bookId });
      res.status(201).json(newCartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Error adding to cart' });
    }
  },

  removeFromCart: async (req, res) => {
    const { userId, bookId } = req.body;
    try {
      // Find the cart item to remove
      const cartItem = await Cart.findOne({ where: { UserID: userId, BookID: bookId } });
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }

      // Delete the cart item
      await cartItem.destroy();
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ error: 'Error removing from cart' });
    }
  }, 

  getCartItems: async (req, res) => {
    const { userId } = req.params;
    try {
      // Find all cart items for the user
      const cartItems = await Cart.findAll({ where: { UserId: userId } });
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ error: 'Cart is empty' });
      }
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Error fetching cart items' });
    }
  }
};

module.exports = cartController;
