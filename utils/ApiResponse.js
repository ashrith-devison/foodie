class ApiResponse {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static send(res, status, message, data) {
        return res.status(status).send(new ApiResponse(status, message, data));
    }
    static ok(res, data) {
        return ApiResponse.send(res, 200, 'ok', data);
    }
}

module.exports = ApiResponse;