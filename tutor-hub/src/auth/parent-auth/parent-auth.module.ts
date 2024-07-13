import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ParentJwtAuthGuard } from './guards/jwt-parentAuth.guard';
import { ParentJwtStrategy } from './strategies/jwt-parentAuth.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ParentAuthService } from './parent-auth.service';

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
  ],
  providers: [ParentAuthService, ParentJwtAuthGuard, ParentJwtStrategy],
  exports: [ParentAuthService],
})
export class ParentAuthModule {}
