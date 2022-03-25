"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__error = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(details) {
        super("Validation Failed!");
        this.name = "ValidationError";
        this.details = Object.values(details).map(({ message }) => message);
    }
}
exports.ValidationError = ValidationError;
function __error(res, error, statusCode = 400) {
    res.status(statusCode).json({
        status: false,
        message: error.message,
        details: error.details || [],
    });
}
exports.__error = __error;
