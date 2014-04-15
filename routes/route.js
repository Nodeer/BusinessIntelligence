var logger = require('../logger').getLogger('route'),
    AuthService = require('../services/auth'),
    UserService = require('../services/user');

exports.public = function() {
    ///<summary>Route to public area</summary>

    return function(req, res, next) {
        return next();
    };
};

exports.private = function(access) {
    ///<summary>Route to private area</summary>
    
    return function(req, res, next) {
        var authService = new AuthService();

        return authService.authenticate(req, res, function() {
            return authService.authorizate(req, res, function() {
                if (access) {
                    return new UserService().requestAccess(req.user, access, function(err) {
                        if (err) {
                            logger.error(err);

                            return res.status(403).end();
                        }

                        return next();
                    });
                }
                return next();
            });
        });
    };
};