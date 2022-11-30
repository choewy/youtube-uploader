import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetTwitchTokenQuery {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;
}

export class GetTwitchStreamKeyQuery {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class TwitchLoginPagePathResponse {
  @ApiResponseProperty()
  @Expose()
  path: string;
}

export class TwitchTokenResponse {
  @ApiResponseProperty()
  @Expose()
  accessToken: string;

  @ApiResponseProperty()
  @Expose()
  refreshToken: string;
}

export class TwitchValidateResponse {
  @ApiResponseProperty()
  @Expose()
  clientId: string;

  @ApiResponseProperty()
  @Expose()
  userId: string;
}

export class TwitchUserStreamKeyResponse {
  @ApiResponseProperty()
  @Expose()
  streamId: string;
}
