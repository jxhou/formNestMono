import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FormsService } from './forms.service';
import { Form } from './models/form.model';
import { FormField } from '../form-fields/models/form-field.model';
import { FormPrincipal } from '../form-principal/models/form-principal.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFormWithFieldsInput } from './dto/create-form.input';

@Resolver(() => Form)
export class FormsResolver {
  constructor(
    private readonly formsService: FormsService,
    @InjectModel(FormField)
    private formFieldModel: typeof FormField,
    @InjectModel(FormPrincipal)
    private formPrincipalModel: typeof FormPrincipal,
  ) {}

  @Query(() => [Form], { name: 'forms' })
  findAll() {
    return this.formsService.findAll({});
  }

  @Query(() => Form, { name: 'form' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.formsService.findOne(id);
  }
  
  @Mutation(() => Form)
  createForm(@Args('createFormInput') createFormInput: CreateFormWithFieldsInput) {
    return this.formsService.create(createFormInput);
  }

  @ResolveField(() => [FormField])
  async formFields(@Parent() form: Form) {
    return this.formFieldModel.findAll({ where: { formId: form.id } });
  }

  @ResolveField(() => [FormPrincipal])
  async formPrincipals(@Parent() form: Form) {
    return this.formPrincipalModel.findAll({ where: { formId: form.id } });
  }
}
