const jwt = require('jsonwebtoken');

const SECRET_KEY = "Ù²ÌÛÓ¶·Ø°ÐÌÍÎÂ´Ø¿µÐÇÌµÌ±ÌÉµÑ·µÎµÙ¬´Ò´ÖµÛÍ½Â¶µÙ¯·Ù´²´Ó¯µÂ³Ì¬ÂÛµÎÛµÓ§¶µ±ÇÔ±ÌÀ±ÇÌµ¿ÙµÙµÎ¬Ù¯Ù¾µ´ÑÙÂÙ°ÓµÙÕÝµ¿´ÍÂµµÑ";

const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ error: 'Unagitd: Token is missing' });
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
