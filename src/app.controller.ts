import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@Req() req: Request, @Res() res: Response): void {
    res.json({
      message: this.appService.getHello(),
      method: req.method,
      body: req.body,
      query: req.query,
      headers: req.headers,
      params: req.params,
    });
  }
}
