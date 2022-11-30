import { api } from '../axios';
import { Cookie } from '../cookies';
import {
  TwitchLoginPathResponse,
  TwitchSignTokenResponse,
  TwitchUserResponse,
  TwitchUserStreamKeyResponse,
} from './types';

export class TwitchApi {
  public static getLoginPagePath(): Promise<TwitchLoginPathResponse> {
    return api({
      method: 'GET',
      url: '/twitch/oauth',
    });
  }

  public static getTokenByCode(code: string): Promise<TwitchSignTokenResponse> {
    return api({
      method: 'GET',
      url: '/twitch/token',
      params: { code },
    });
  }

  public static getUserByToken(): Promise<TwitchUserResponse> {
    return api({
      method: 'GET',
      url: '/twitch/validate',
      headers: { Authorization: `OAuth ${Cookie.getTwitchAccessToken()}` },
    });
  }

  public static getUserStreamKeys(
    userId: string,
    clientId: string,
  ): Promise<TwitchUserStreamKeyResponse[]> {
    return api({
      method: 'GET',
      url: '/twitch/stream-keys',
      params: { userId },
      headers: {
        Authorization: `Bearer ${Cookie.getTwitchAccessToken()}`,
        'Client-Id': clientId,
      },
    });
  }
}
