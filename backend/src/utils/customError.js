export class CustomError extends Error{
    constructor(message,statusCode,errors=undefined){
        super(message);
        this.statusCode = statusCode;
        this.errors=errors;
    }
}