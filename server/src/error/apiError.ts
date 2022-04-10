module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static NoAccesRights() {
    return new ApiError(403, 'Нет доступа');
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
}