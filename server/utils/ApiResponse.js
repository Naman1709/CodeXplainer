class ApiResponse {
    constructor(success, message, data = null, statusCode = 200) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    static success(res, message = 'Success', data = null, statusCode = 200) {
        return new ApiResponse(true, message, data, statusCode).send(res);
    }

    static error(res, message = 'Error', data = null, statusCode = 500) {
        const safeMessage = (typeof message === 'string' && message.trim() && message !== 'Error')
            ? message
            : 'An Unknown Error Occurred';
        return new ApiResponse(false, safeMessage, data, statusCode).send(res);
    }

    toJSON() {
        return {
            success: this.success,
            message: this.message,
            data: this.data,
        };
    }

    send(res) {
        return res.status(this.statusCode).json(this.toJSON());
    }
}

module.exports = ApiResponse;
