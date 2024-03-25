class ApiError extends Error {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
  error: any;
  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.error = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
