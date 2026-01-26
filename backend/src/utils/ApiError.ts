class ApiError extends Error {
  public statusCode: number;
  public errors: string[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: string[] = [],
    stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError}