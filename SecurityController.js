const jwt = require('jsonwebtoken');

const SECRET_KEY = "smnsjdwsllldfhyaebfndjkasnbbzvusaij";
// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ error: 'Unauthorized: Token is missing' });
//     }

//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//         }

//         req.userId = decoded.userId;
//         next();
//     });
// };

const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ error: 'Unauthorized: Token is missing' });
    }
    token = auth.split(' ')[1]
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
    
        req.userId = decoded.userId;
        next();
    });
};

const signToken = (user, callback) => {
    jwt.sign({ user: user }, SECRET_KEY, (err, token) => {
        callback(err, token);
    });
};

module.exports = {
    verifyToken,
    signToken,
};
