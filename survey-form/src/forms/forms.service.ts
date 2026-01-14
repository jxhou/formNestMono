import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFormDto } from './dto/create-form.dto';
import { CreateFormWithFieldsInput } from './dto/create-form.input';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './models/form.model';
import { FormField } from 'src/form-fields/models/form-field.model';
import { FormPrincipal } from 'src/form-principal/models/form-principal.model';

import { FindOptions, WhereOptions } from 'sequelize';

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form) private formModel: typeof Form,) {}

  async create(createFormDto: CreateFormDto | CreateFormWithFieldsInput) {
    return this.formModel.create(
      {
        ...createFormDto,
      },
      {
        include: [FormField],
      },
    );
  }

  async findAll(query: { name?: string; state?: number }) {
    const findOptions: FindOptions = {};
    const where: WhereOptions = {};

    if (query.name) {
      where.name = query.name;
    }

    if (query.state) {
      where.state = query.state;
    }

    if (Object.keys(where).length) {
      findOptions.where = where;
    }

    return this.formModel.findAll(findOptions);
  }

  async findOne(id: number) {
    const form = await this.formModel.findByPk(id);
    return form;
    // return this.formModel.findByPk(id);
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return this.formModel.update(updateFormDto, { where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
