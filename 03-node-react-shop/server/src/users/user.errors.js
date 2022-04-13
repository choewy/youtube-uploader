const UserErrors = {
  InvalidName: () => ({
    code: 400,
    message: '이름을 입력하세요.',
  }),
  InvalidEmail: () => ({
    code: 400,
    message: '이메일을 입력하세요.',
  }),
  InvalidPassword: () => ({
    code: 400,
    message: '비밀번호를 입력하세요.',
  }),
  IncorrectPassword: () => ({
    code: 400,
    message: '비밀번호가 동일하지 않습니다.',
  }),
  AlreadyExist: () => ({
    code: 400,
    message: '이미 존재하는 이메일 계정입니다.',
  }),
  NotExistUser: () => ({
    code: 400,
    message: '존재하지 않는 이메일 계정입니다.',
  }),
  IncorrectEmailOrPassword: () => ({
    code: 400,
    message: '이메일 계정 또는 비밀번호가 올바르지 않습니다.',
  }),
  UndefinedToken: () => ({
    code: 401,
    message: '로그인 후 이용 가능한 서비스입니다.',
  }),
  InvalidToken: () => ({
    code: 400,
    message: '유효하지 않은 토큰입니다.',
  }),
  ExpiredToken: () => ({
    code: 400,
    message: '만료된 토큰입니다.',
  }),
};

export default UserErrors;
