import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export class NotFoundChannelByNameException extends NotFoundException {}
export class GoToYoutubeStdioErrorException extends InternalServerErrorException {}
export class InsertEmailErrorException extends InternalServerErrorException {}
export class InsertPasswordErrorException extends InternalServerErrorException {}
export class OpenTopAccountMenuErrorException extends InternalServerErrorException {}
export class OpenChannelSelectMenuErrorException extends InternalServerErrorException {}
export class ClickSelectedChannelErrorException extends InternalServerErrorException {}
export class ClickUploadButtonErrorException extends InternalServerErrorException {}
export class UploadFileErrorException extends InternalServerErrorException {}
export class WriteVideoDescriptionErrorException extends InternalServerErrorException {}
