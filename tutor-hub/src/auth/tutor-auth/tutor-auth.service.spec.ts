import { Test, TestingModule } from '@nestjs/testing';
import { TutorAuthService } from './tutor-auth.service';

describe('TutorAuthService', () => {
  let service: TutorAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorAuthService],
    }).compile();

    service = module.get<TutorAuthService>(TutorAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
