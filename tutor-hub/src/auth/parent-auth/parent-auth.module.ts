import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ParentJwtAuthGuard } from './guards/jwt-parentAuth.guard';
import { ParentJwtStrategy } from './strategies/jwt-parentAuth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ParentAuthService } from './parent-auth.service';
import { ParentsService } from 'src/users/parents/parents.service';
import { ParentGoogleAuthGuard } from './guards/parentAuthGoogle.guard';
import { ParentGoogleStrategy } from './strategies/parentAuthGoogle.strategy';
import { ParentsModule } from 'src/users/parents/parents.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2 days' },
      }),
    }),
    forwardRef(() => ParentsModule),
  ],
  providers: [
    ParentAuthService,
    ParentJwtAuthGuard,
    ParentJwtStrategy,
    ParentsService,
    ParentGoogleAuthGuard,
    ParentGoogleStrategy,
  ],
  exports: [ParentAuthService],
})
export class ParentAuthModule {}
