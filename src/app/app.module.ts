import { Module } from '@nestjs/common';

import { CoreModule } from '@/core';
import { YoutubeModule } from '@/youtube';

import { AppService } from './app.service';

@Module({
  imports: [CoreModule, YoutubeModule],
  providers: [AppService],
})
export class AppModule {}
