import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FormField } from '../models/form-field.model';
import { FormFieldsService } from '../form-fields.service';
import { Form } from '../../forms/models/form.model';
import { InjectModel } from '@nestjs/sequelize';

@Resolver(() => FormField)
export class FormFieldsResolver {
  constructor(
    private readonly formFieldsService: FormFieldsService,
    @InjectModel(Form)
    private formModel: typeof Form,
  ) {}

  @Query(() => [FormField], { name: 'formFields' })
  findAll() {
    return this.formFieldsService.findAll({});
  }

  @Query(() => FormField, { name: 'formField' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.formFieldsService.findOne(id);
  }

  @ResolveField(() => Form, { name: 'form' })
  async getForm(@Parent() formField: FormField) {
    return this.formModel.findByPk(formField.formId);
  }
}
