import User from './user.model';
import UserErrors from './user.errors';
import { GenerateToken, HashPassord, VerifyPassword } from './user.utils';

const UserService = {
  signup: async (userDto) => {
    const { email } = userDto;
    const exist = await User.findOne({ email });
    if (exist) throw UserErrors.AlreadyExist();

    const user = new User(userDto);
    await HashPassord(user);

    const token = await GenerateToken(user._id);
    return token;
  },

  signin: async (userDto) => {
    const user = await User.findOne({ email: userDto.email });
    if (!user) throw UserErrors.NotExistUser();

    const { password } = userDto;
    const verify = await VerifyPassword(password, user);
    if (!verify) throw UserErrors.WrongPassword();

    const token = await GenerateToken(user._id);
    return token;
  },
};

export default UserService;
