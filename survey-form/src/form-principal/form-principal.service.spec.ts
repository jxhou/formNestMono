import { Test, TestingModule } from '@nestjs/testing';
import { FormPrincipalService } from './form-principal.service';

describe('FormPrincipalService', () => {
  let service: FormPrincipalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormPrincipalService],
    }).compile();

    service = module.get<FormPrincipalService>(FormPrincipalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
