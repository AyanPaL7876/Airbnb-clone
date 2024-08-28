class ExpressError extends Error {
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode;
        this.message = this.message;
    }
}

module.exports = ExpressError;