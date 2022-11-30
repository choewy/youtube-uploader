import { Module } from '@nestjs/common';
import { CoreModule } from '@/core';
import { MainModule } from '@/modules';
import { AppController } from './app.controller';

@Module({
  imports: [CoreModule, MainModule],
  controllers: [AppController],
})
export class AppModule {}
