const UserCart = require('../models/userCart');
const Transaction = require('../models/transactionModel');
const Book = require('../models/bookModel'); // Import the Book model

const userCartController = {
  addToCart: async (req, res) => {
    try {
      const { userId, bookId } = req.body;
      
      // Check if the item is already in the cart
      const existingCartItem = await UserCart.findOne({ where: { UserID: userId, BookID: bookId } });
      if (existingCartItem) {
        return res.status(400).json({ error: 'Item already exists in the cart' });
      }

      // Create a new cart item
      const newCartItem = await UserCart.create({ UserID: userId, BookID: bookId });
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
      const cartItem = await UserCart.findOne({ where: { UserID: userId, BookID: bookId } });
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
      const cartItems = await UserCart.findAll({ 
        where: { UserId: userId }, 
        include: [{ model: Book }] // Include the Book model to fetch book details
      });
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ error: 'Cart is empty' });
      }

      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Error fetching cart items' });
    }
  },

  checkout: async (req, res) => {
    const { userId } = req.body;
    try {
        // Find all cart items for the user
        const cartItems = await UserCart.findAll({
            where: { UserId: userId },
            include: [{ model: Book }] // Include the Book model to fetch book details
        });
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ error: 'Cart is empty' });
        }

        // Calculate total price
        let totalPrice = 0;
        for (const cartItem of cartItems) {
            totalPrice += parseFloat(cartItem.book.Price);
        }

        res.status(200).json({ cartItems, totalPrice });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'Error during checkout' });
    }
},


confirmPayment: async (req, res) => {
    const { userId } = req.body;
    try {
      // Find all cart items for the user
      const cartItems = await UserCart.findAll({
        where: { UserID: userId },
        include: [{ model: Book }] // Include the Book model to fetch book details
      });
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ error: 'Cart is empty' });
      }

      // Calculate total price
      const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.book.Price), 0);

      // Create a new transaction record
      const newTransaction = await Transaction.create({
        UserID: userId,
        TransactionDate: new Date(),
        TransactionStatus: 'pending', // Assuming the transaction status is initially pending
        CartItems: cartItems.map(item => ({
          Name: item.book.Title,
          Price: item.book.Price
        })),
        TotalPrice: totalPrice
      });

      // Clear the cart by removing all items
      await UserCart.destroy({ where: { UserID: userId } });

      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error confirming payment:', error);
      res.status(500).json({ error: 'Error confirming payment' });
    }
  }
};

module.exports = userCartController;