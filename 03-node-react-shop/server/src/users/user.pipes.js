import User from './user.model';
import UserErrors from './user.errors';
import { VerifyAuthorization } from './user.utils';

export const UserSignupPipe = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (name === '') {
    const { code, message } = UserErrors.InvalidName();
    return res.status(code).send({ message });
  }

  if (email === '') {
    const { code, message } = UserErrors.InvalidEmail();
    return res.status(code).send({ message });
  }

  if (password === '') {
    const { code, message } = UserErrors.InvalidPassword();
    return res.status(code).send({ message });
  }

  if (password !== confirmPassword) {
    const { code, message } = UserErrors.IncorrectPassword();
    return res.status(code).send({ message });
  }

  next();
};

export const UserSigninPipe = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') {
    const { code, message } = UserErrors.InvalidEmail();
    return res.status(code).send({ message });
  }

  if (password === '') {
    const { code, message } = UserErrors.InvalidPassword();
    return res.status(code).send({ message });
  }

  next();
};

export const UserAuthorizePipe = async (req, res, next) => {
  const { authorization } = req.headers;

  const payload = await VerifyAuthorization(authorization);

  if (payload === 0) {
    const { code, message } = UserErrors.UndefinedToken();
    res.cookie('token', undefined);
    return res.status(code).send({ message });
  }

  if (payload === 1) {
    const { code, message } = UserErrors.InvalidToken();
    res.cookie('token', undefined);
    return res.status(code).send({ message });
  }

  if (payload === 2) {
    const { code, message } = UserErrors.ExpiredToken();
    res.cookie('token', undefined);
    return res.status(code).send({ message });
  }

  const user = await User.findById(payload);

  if (!user) {
    const { code, message } = UserErrors.NotExistUser();
    res.cookie('token', undefined);
    return res.status(code).send({ message });
  }

  req.user = user;
  next();
};
