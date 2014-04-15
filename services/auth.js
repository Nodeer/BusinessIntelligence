var Base = require('./base');

var AuthService = Base.extend(function() {})
    .methods({
        authenticate: function (req, res, next) {
            ///<summary>Authenticates user</summary>
            ///<param name="req">Request</param>
            ///<param name="res">Response</param>
            ///<param name="next">Next function</param>

            if (req.isAuthenticated()) {
                return next();
            }
        
            return res.send(401);
        },

        authorizate: function (req, res, next) {
            ///<summary>Authorizates user</summary>
            ///<param name="req">Request</param>
            ///<param name="res">Response</param>
            ///<param name="next">Next function</param>

            return next();
        }
    });

module.exports = AuthService;
