const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.cookies.tokenCookie;

    if (!token) {
        return res.status(401).json({
            message: 'No token found',
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Req user: ", req.user);
        
        return next();
    } catch (err) {
        return res.status(401).json({
            message: 'Unauthorized token',
        })

    }

}


module.exports=auth;