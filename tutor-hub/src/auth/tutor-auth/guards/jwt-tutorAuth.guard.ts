import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TutorJwtAuthGuard extends AuthGuard('jwt') {}
