import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FormPrincipal } from '../models/form-principal.model';
import { FormPrincipalService } from '../form-principal.service';
import { Form } from '../../forms/models/form.model';
import { InjectModel } from '@nestjs/sequelize';

@Resolver(() => FormPrincipal)
export class FormPrincipalResolver {
  constructor(
    private readonly formPrincipalService: FormPrincipalService,
    @InjectModel(Form)
    private formModel: typeof Form,
  ) {}

  @Query(() => [FormPrincipal], { name: 'formPrincipals' })
  findAll() {
    return this.formPrincipalService.findAll();
  }

  @Query(() => FormPrincipal, { name: 'formPrincipal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.formPrincipalService.findOne(id);
  }

  @ResolveField(() => Form, { name: 'form' })
  async getForm(@Parent() formPrincipal: FormPrincipal) {
    return this.formModel.findByPk(formPrincipal.formId);
  }
}
