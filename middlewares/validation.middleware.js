/**
 * @module ValidationMiddleware
 * @description Middleware for validating Request's Body
 * @author Nikzzy
 */

/* eslint-disable */
const Validator = require('fastest-validator');

const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const { body } = req;
        const validator = new Validator();
        const result = validator.validate(body, schema);

        if (result !== true) {
            return res.status(400).send({
                error: 'Bad Request',
                message: 'Cannot process the request because it is malformed or incorrect',
                errors: result,
            });
        }

        return next();
    };
};

module.exports = validationMiddleware;
