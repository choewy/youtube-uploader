export type TwitchTokenResponseType = {
  token_type: 'bearer';
  scope: string[];
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type TwitchTokenValidateResponseType = {
  client_id: string;
  user_id: string;
  login: string;
  scopes: string[];
  expires_in: number;
};

export type TwitchUserStreamKeyResponseType = {
  data: Array<{ stream_key: string }>;
};
