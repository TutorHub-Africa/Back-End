import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class StudentGoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    return activate;
  }
}
