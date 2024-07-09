class ApiResponse {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static send(res, status, message, data) {
        return res.status(status).send(new ApiResponse(status, message, data));
    }
}

module.exports = ApiResponse;