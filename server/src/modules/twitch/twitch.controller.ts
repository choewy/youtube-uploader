import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  GetTwitchStreamKeyQuery,
  GetTwitchTokenQuery,
  TwitchLoginPagePathResponse,
  TwitchTokenResponse,
  TwitchValidateResponse,
} from './dtos';
import { TwitchService } from './twitch.service';

@ApiTags('OAuth 2.0')
@Controller('twitch')
export class TwitchController {
  constructor(private readonly service: TwitchService) {}

  @Get('oauth')
  @ApiOperation({ summary: 'Twitch OAuth 로그인' })
  async getLoginPath(): Promise<TwitchLoginPagePathResponse> {
    return this.service.getLoginPath();
  }

  @Get('token')
  @ApiOperation({ summary: 'Twitch OAuth 토큰 발급' })
  async getToken(
    @Query() queryParams: GetTwitchTokenQuery,
  ): Promise<TwitchTokenResponse> {
    return this.service.getTokensByCode(queryParams.code);
  }

  @Get('validate')
  @ApiOperation({ summary: 'Twitch 토큰 확인' })
  async validate(@Req() request: Request): Promise<TwitchValidateResponse> {
    return this.service.validateToken(request.headers.authorization);
  }

  @Get('stream-keys')
  @ApiOperation({ summary: 'Twitch Stream Key' })
  async getStreamKeys(
    @Req() request: Request,
    @Query() queryParams: GetTwitchStreamKeyQuery,
  ): Promise<any> {
    return this.service.getStreamKeys(
      request.headers.authorization,
      request.headers['client-id'] as string,
      queryParams.userId,
    );
  }
}
