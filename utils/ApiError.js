class ApiError extends Error{
    constructor(statuscode, message){
        super();
        this.statuscode = statuscode;
        this.message = message;
    }

    static badRequest(message){
        return new ApiError(400, message);
    }

    static notFound(message){
        return new ApiError(404, message);
    }

    static unauthorized(message){
        return new ApiError(401, message);
    }

    static forbidden(message){
        return new ApiError(403, message);
    }

}

module.exports = ApiError;