import axios from 'axios';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey, TwitchConfig } from '@/core';
import { TwitchApiException } from './exceptions';
import {
  TwitchTokenResponse,
  TwitchLoginPagePathResponse,
  TwitchValidateResponse,
  TwitchUserStreamKeyResponse,
} from './dtos';
import {
  TwitchTokenResponseType,
  TwitchTokenValidateResponseType,
  TwitchUserStreamKeyResponseType,
} from './types';

@Injectable()
export class TwitchService {
  private readonly config: TwitchConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<TwitchConfig>(ConfigKey.Twitch);
  }

  private createUrl(url: string, params: object) {
    return `${url}?${Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`;
  }

  async getLoginPath(): Promise<TwitchLoginPagePathResponse> {
    const url = 'https://id.twitch.tv/oauth2/authorize';

    const res = new TwitchLoginPagePathResponse();
    res.path = this.createUrl(url, this.config);

    return res;
  }

  async getTokensByCode(code: string): Promise<TwitchTokenResponse> {
    const { client_id, client_secret, redirect_uri, grant_type } = this.config;
    const url = 'https://id.twitch.tv/oauth2/token';

    try {
      const { data } = await axios<TwitchTokenResponseType>({
        url,
        method: 'POST',
        params: {
          code,
          client_id,
          client_secret,
          grant_type,
          redirect_uri,
        },
      });

      const res = new TwitchTokenResponse();

      res.accessToken = data.access_token;
      res.refreshToken = data.refresh_token;

      return res;
    } catch (e) {
      throw new TwitchApiException(e);
    }
  }

  async validateToken(
    twitchAuthorization: string,
  ): Promise<TwitchValidateResponse> {
    const url = 'https://id.twitch.tv/oauth2/validate';

    try {
      const { data } = await axios<TwitchTokenValidateResponseType>({
        url,
        method: 'GET',
        headers: { Authorization: twitchAuthorization },
      });

      const res = new TwitchValidateResponse();
      res.userId = data.user_id;
      res.clientId = data.client_id;

      return res;
    } catch (e) {
      throw new TwitchApiException(e);
    }
  }

  async getStreamKeys(
    twitchAuthorization: string,
    clientId: string,
    userId: string,
  ): Promise<TwitchUserStreamKeyResponse[]> {
    const url = 'https://api.twitch.tv/helix/streams/key';

    try {
      const { data } = await axios<TwitchUserStreamKeyResponseType>({
        url,
        method: 'GET',
        headers: {
          Authorization: twitchAuthorization,
          'Client-Id': clientId,
        },
        params: {
          broadcaster_id: userId,
        },
      });

      return data.data.map(({ stream_key }) => {
        const res = new TwitchUserStreamKeyResponse();
        res.streamId = stream_key;

        return res;
      });
    } catch (e) {
      throw new TwitchApiException(e);
    }
  }
}
