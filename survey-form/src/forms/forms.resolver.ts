import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { FormsService } from './forms.service';
import { Form } from './models/form.model';

@Resolver(() => Form)
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Query(() => [Form], { name: 'forms' })
  findAll() {
    return this.formsService.findAll({});
  }

  @Query(() => Form, { name: 'form' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.formsService.findOne(id);
  }
}
