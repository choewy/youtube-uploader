import { BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';

export class TwitchApiException extends BadRequestException {
  constructor(e: AxiosError) {
    super(e.response.data);
  }
}
