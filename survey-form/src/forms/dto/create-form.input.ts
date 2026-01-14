import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateFormFieldInput {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field({ defaultValue: false })
  required?: boolean;

  @Field(() => Int, { defaultValue: 0 })
  order?: number;

  @Field({ defaultValue: true })
  active?: boolean;
}

@InputType()
export class CreateFormWithFieldsInput {
  @Field()
  name: string;

  @Field(() => Int)
  state: number;

  @Field(() => [CreateFormFieldInput], { nullable: 'itemsAndList' })
  formFields?: CreateFormFieldInput[];
}
