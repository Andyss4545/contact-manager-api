// error handler with middleware to add some custom rule to the error throwed 
const {constants} = require("../constants")
const errorHandler = (err, req, res, next) => {
        const statusCode = res.statusCode ? res.statusCode : 500 // show if there is a status code otherwise show 500 
        switch (statusCode) {
            case constants.VALIDATION_ERROR: // throw validation failed if the the status code is 400
                res.json({
                    title: "Validation Failed", 
                    message: err.message, 
                    stackTrace: err.stack
                });
                break;
            case constants.NOT_FOUND: // throw error not found if the the status code is 404
                res.json({
                    title: "Not Found", 
                    message: err.message, 
                    stackTrace: err.stack
                });

                case constants.UNAUTHORIZED: // throw unauthorized if the the status code is 401
                res.json({
                    title: "Unauthorized", 
                    message: err.message, 
                    stackTrace: err.stack
                });

                case constants.FORBIDDEN: // throw Forbidden if the the status code is 403
                res.json({
                    title: "Forbidden", 
                    message: err.message, 
                    stackTrace: err.stack
                });

                case constants.SERVER_ERROR: // throw Server Error if the the status code is 500
                res.json({
                    title: "Server Error", 
                    message: err.message, 
                    stackTrace: err.stack
                });
            default:
                  console.log('No error, all good')
                break;
        }
};


module.exports = errorHandler;