import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    // Check if token is provided
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token belongs to the admin
    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    // Attach the decoded token to the request for further use
    req.user = decodedToken;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
