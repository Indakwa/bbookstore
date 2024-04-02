// authMiddleware.js

const jwt = require('jsonwebtoken');

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
    // Get the token from the request headers
    const fullToken = req.headers.authorization;

    const token = fullToken.split(' ')[1];

    console.log('Received token:', token);

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err); // Log the error
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            // Log the decoded payload
            console.log('Decoded payload:', decoded);

            // Check if the user has admin role
            if (decoded.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }
            // Attach the decoded user object to the request for further use
            req.user = decoded;
            next();
        }
    });

      
};

// Authorization Middleware
const authorize = (req, res, next) => {
    // Check if the user has admin role
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = { authenticateAdmin, authorize };
