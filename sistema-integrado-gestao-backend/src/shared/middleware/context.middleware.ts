import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from '../contexts/request-context';

interface JwtPayload {
  orgaoId: number;
  sub: number;
  // outros campos do seu token, se houver
}

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ContextMiddleware.name);

  constructor(
    private readonly requestContext: RequestContext,
    private readonly jwtService: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction): void {
    try {
      const token = this.extractTokenFromHeader(req);
      if (token) {
        const decoded = this.jwtService.decode(token) as JwtPayload;
        if (decoded) {
          if (decoded.orgaoId) {
            this.requestContext.setOrgaoId(decoded.orgaoId);
          } else {
            this.logger.warn('Token não contém orgaoId');
          }

          if (decoded.sub) {
            this.requestContext.setUserId(decoded.sub);
          } else {
            this.logger.warn('Token não contém sub (userId)');
          }
        }
      }
    } catch (error) {
      this.logger.error(`Erro ao processar token: ${error.message}`);
    } finally {
      next();
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
