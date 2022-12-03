import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { YoutubeService } from '@/youtube';

export class Bootstrap {
  private static app: INestApplication;

  public static async createApp(module: any, options?: NestApplicationOptions) {
    this.app = await NestFactory.create(module, options);
  }

  public static async run() {
    await this.app.get(YoutubeService).uploadVedio(
      {
        path: './temp/test.mp4',
        title: `${Date.now()}`,
        description: 'TEST',
      },
      { headless: false },
    );
  }
}
