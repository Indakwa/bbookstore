const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { userId } = req.body;
      
      // Find all items in the cart for the user
      const cartItems = await Cart.findAll({ where: { userId } });
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      // Calculate total price
      let totalPrice = 0;
      cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
      });

      // Create the order
      const newOrder = await Order.create({ userId, totalPrice });

      // Associate cart items with the order
      await Promise.all(cartItems.map(item => {
        return item.update({ orderId: newOrder.id });
      }));

      // Clear the cart
      await Cart.destroy({ where: { userId } });

      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Error creating order' });
    }
  },

  completeOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      order.status = 'complete';
      await order.save();
      
      res.status(200).json({ message: 'Order completed successfully' });
    } catch (error) {
      console.error('Error completing order:', error);
      res.status(500).json({ error: 'Error completing order' });
    }
  }
};

module.exports = orderController;
