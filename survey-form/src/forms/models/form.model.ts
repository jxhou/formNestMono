import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { FormField } from '../../form-fields/models/form-field.model';

@ObjectType()
@Table
export class Form extends Model {
  @Field(() => Int)
  declare id: number;

  @Field()
  @Column
  name: string;

  @Field(() => Int)
  @Column
  state: number;

  @Field(() => [FormField])
  @HasMany(() => FormField)
  formFields: FormField[];
}
