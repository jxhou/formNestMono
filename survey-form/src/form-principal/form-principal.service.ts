import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFormPrincipalDto } from './dto/create-form-principal.dto';
import { UpdateFormPrincipalDto } from './dto/update-form-principal.dto';
import { FormPrincipal } from './models/form-principal.model';

@Injectable()
export class FormPrincipalService {
  constructor(
    @InjectModel(FormPrincipal)
    private formPrincipalModel: typeof FormPrincipal,
  ) {}

  create(createFormPrincipalDto: CreateFormPrincipalDto) {
    return this.formPrincipalModel.create(createFormPrincipalDto as any);
  }

  findAll() {
    return this.formPrincipalModel.findAll();
  }

  findOne(id: number) {
    return this.formPrincipalModel.findByPk(id);
  }

  update(id: number, updateFormPrincipalDto: UpdateFormPrincipalDto) {
    return this.formPrincipalModel.update(updateFormPrincipalDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.formPrincipalModel.destroy({ where: { id } });
  }
}
