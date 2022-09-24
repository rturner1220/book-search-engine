const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware(context) {
    const { req, res } = context;
    const ctx = {
      ...context,
    };
    console.log(Object.keys(req))
    console.log(req.url)
    // allows token to be sent via  req.query or headers
    let token = req.headers.authorization || req.query.token;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (token) {
      // verify token and get user data out of it
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        ctx.user = data;
      } catch {
        console.log('Invalid token');
        return res.status(400).json({ message: 'invalid token!' });
      }
    }

    return ctx;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
