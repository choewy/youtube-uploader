export type TwitchLoginPathResponse = {
  path: string;
};

export type TwitchSignTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TwitchUserResponse = {
  userId: string;
  clientId: string;
};

export type TwitchUserStreamKeyResponse = {
  streamId: string;
};
