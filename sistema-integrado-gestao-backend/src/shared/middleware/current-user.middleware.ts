import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CurrentUserService } from '../services/current-user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private currentUserService: CurrentUserService) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const decodedToken = jwt.decode(token) as any;
        const user = {
          sub: decodedToken.sub,
          preferred_username: decodedToken.preferred_username,
          email: decodedToken.email,
          name: decodedToken.name,
          roles: decodedToken.realm_access?.roles || [],
        };
        this.currentUserService.setCurrentUser(user);
      } else {
        this.currentUserService.setCurrentUser(null);
      }
    } catch {
      this.currentUserService.setCurrentUser(null);
    }
    next();
  }
}
