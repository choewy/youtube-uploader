import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey, YoutubeConfig } from '@/core';
import { YoutubeUploader } from './class';
import { Video } from './types';
import { PuppeteerLaunchOptions } from 'puppeteer';

@Injectable()
export class YoutubeService {
  private readonly credentials: YoutubeConfig;

  constructor(private readonly configService: ConfigService) {
    this.credentials = this.configService.get<YoutubeConfig>(ConfigKey.Youtube);
  }

  async uploadVedio(
    video: Video,
    options?: PuppeteerLaunchOptions,
  ): Promise<void> {
    return new YoutubeUploader(this.credentials).run(video, options);
  }
}
