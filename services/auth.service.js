exports.authenticate = function (req, res, next) {
    ///<summary>Authenticates user</summary>
    ///<param name="req">Request</param>
    ///<param name="res">Response</param>
    ///<param name="next">Next function</param>

    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }

    return this;
};
