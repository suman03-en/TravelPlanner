export const errorHandler =(error,req,res,next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    const errors = error.errors || undefined;

    const response = {
        success:false,
        message,
    };
    if(errors) response.errors = errors;
    res.status(statusCode).json(response);
}