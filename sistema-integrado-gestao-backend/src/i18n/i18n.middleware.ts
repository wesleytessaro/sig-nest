import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { I18nService } from './i18n.service';

@Injectable()
export class I18nMiddleware implements NestMiddleware {
  constructor(private readonly i18n: I18nService) {}

  use(req: Request, _: Response, next: NextFunction): void {
    const locale =
      (req.query.lang as string) ||
      req.headers['accept-language']?.split(',')[0] ||
      'pt-BR';

    this.i18n.setLocale(locale);
    next();
  }
}
