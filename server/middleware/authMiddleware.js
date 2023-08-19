import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.AuthToken; 

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user information in the request object
        next(); 
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

export default verifyToken;
