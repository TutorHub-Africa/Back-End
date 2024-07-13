import { Test, TestingModule } from '@nestjs/testing';
import { ParentAuthService } from './parent-auth.service';

describe('ParentAuthService', () => {
  let service: ParentAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParentAuthService],
    }).compile();

    service = module.get<ParentAuthService>(ParentAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
