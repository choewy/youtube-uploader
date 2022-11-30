import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('앱')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Swagger API Docs' })
  @ApiExcludeEndpoint(true)
  async swaggerApiDocs(@Res() response: Response): Promise<void> {
    return response.redirect('/api-docs');
  }
}
