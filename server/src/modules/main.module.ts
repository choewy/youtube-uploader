import { Module } from '@nestjs/common';
import { TwitchModule } from './twitch';

@Module({
  imports: [TwitchModule],
})
export class MainModule {}
