import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  home() {
    return {
      service: 'studentmart-api',
      message: 'StudentMart API is running',
      documentation: '/api/docs',
      openapi: '/api/docs-json',
      health: '/api/health',
    };
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'studentmart-api' };
  }
}
