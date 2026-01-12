import { Injectable } from '@nestjs/common';
import { CreateFormFieldDto } from './dto/create-form-field.dto';
import { UpdateFormFieldDto } from './dto/update-form-field.dto';
// import { FormFieldsModule } from './form-fields.module';
import { InjectModel } from '@nestjs/sequelize';
import { FormField } from './models/form-field.model';
import { FindOptions, WhereOptions } from 'sequelize';
import { Form } from 'src/forms/models/form.model';


@Injectable()
export class FormFieldsService {
  constructor(@InjectModel(FormField)  private formFieldsModel: typeof FormField) {}

  create(createFormFieldDto: CreateFormFieldDto) {
    return 'This action adds a new formField';
  }

  findAll(query: { name?: string; state?: number }) {
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
  
    return this.formFieldsModel.findAll(findOptions);
  }

  findOne(id: number) {
    return this.formFieldsModel.findByPk(id);
  }

  update(id: number, updateFormFieldDto: UpdateFormFieldDto) {
    return `This action updates a #${id} formField`;
  }

  remove(id: number) {
    return `This action removes a #${id} formField`;
  }
}
