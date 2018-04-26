
export function HTTPError(status = 500, message = "Internal Server Error") {
    let error = new Error(message);
    error.status = status;
    Error.captureStackTrace(error, HTTPError);
    return error;
}
