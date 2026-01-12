import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormFieldsService } from './form-fields.service';
import { FormFieldsController } from './form-fields.controller';
import { FormField } from './models/form-field.model';
import { FormFieldsResolver } from './resolvers/form-fields.resolver';
import { Form } from '../forms/models/form.model';

@Module({
  imports: [SequelizeModule.forFeature([FormField, Form])],
  controllers: [FormFieldsController],
  providers: [FormFieldsService, FormFieldsResolver],
})
export class FormFieldsModule {}
