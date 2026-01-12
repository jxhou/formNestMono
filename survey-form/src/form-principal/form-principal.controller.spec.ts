import { Test, TestingModule } from '@nestjs/testing';
import { FormPrincipalController } from './form-principal.controller';
import { FormPrincipalService } from './form-principal.service';

describe('FormPrincipalController', () => {
  let controller: FormPrincipalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormPrincipalController],
      providers: [FormPrincipalService],
    }).compile();

    controller = module.get<FormPrincipalController>(FormPrincipalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
