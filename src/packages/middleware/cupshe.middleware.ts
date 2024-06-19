import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CupsheMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    res.locals.name = 'ssss';
    next();
  }
}
