import { registerAs } from '@nestjs/config';
import { ConfigKey } from './enums';
import { YoutubeConfig } from './types';

export default registerAs(
  ConfigKey.Youtube,
  (): YoutubeConfig => ({
    email: process.env.YOUTUBE_EMAIL,
    password: process.env.YOUTUBE_PASSWORD,
    channelName: process.env.YOUTUBE_CHANNEL_NAME,
  }),
);
