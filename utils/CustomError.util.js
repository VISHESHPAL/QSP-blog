class CustomError extends Error {
    constructor(message , statusCode ){
        super(); //  calling the parent class always on the top
        this.message = message;
        this.statusCode = statusCode
    }
}

export default CustomError