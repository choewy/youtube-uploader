import Cookies, { CookieSetOptions } from 'universal-cookie';

export enum CookieKey {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
  TwitchAccessToken = 'twitch_access_token',
  TwitchRefreshToken = 'twitch_refresh_token',
}

export class Cookie {
  private static cookies = new Cookies();
  private static options: CookieSetOptions = { path: '/' };

  public static getAccessToken(): string {
    return this.cookies.get(CookieKey.AccessToken);
  }

  public static setAccessToken(token: string): void {
    this.cookies.set(CookieKey.AccessToken, token, this.options);
  }

  public static removeAccessToken(): void {
    this.cookies.remove(CookieKey.AccessToken, this.options);
  }

  public static getTwitchAccessToken(): string {
    return this.cookies.get(CookieKey.TwitchAccessToken);
  }

  public static setTwitchAccessToken(token: string) {
    this.cookies.set(CookieKey.TwitchAccessToken, token, this.options);
  }

  public static removeTwitchAccessToken() {
    this.cookies.remove(CookieKey.TwitchAccessToken, this.options);
  }
}
