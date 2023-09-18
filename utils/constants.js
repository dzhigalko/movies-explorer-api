const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;
const HTTP_SERVER_ERROR = 500;
const HTTP_CREATED = 201;
const HTTP_UNAUTHORIZED = 401;
const HTTP_CONFLICT = 409;
const HTTP_FORBIDDEN = 403;

const AuthorizationRequiredMessage = 'Authorization required';
const ServerErrorMessage = 'Something went wrong';
const UserNotFoundMessage = 'User not found';
const MovieNotFoundMessage = 'Movie not found';
const UserUnauthorizedToDeleteMovieMessage = 'User doesn\'t have access to delete movie';
const WrongEmailOrPasswordMessage = 'Пользователь не найден или неверный пароль';
const NotFoundMessage = 'Not found';

module.exports = {
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_SERVER_ERROR,
  HTTP_CREATED,
  HTTP_UNAUTHORIZED,
  HTTP_CONFLICT,
  HTTP_FORBIDDEN,
  AuthorizationRequiredMessage,
  ServerErrorMessage,
  UserNotFoundMessage,
  MovieNotFoundMessage,
  UserUnauthorizedToDeleteMovieMessage,
  WrongEmailOrPasswordMessage,
  NotFoundMessage,
};
