import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { FormField } from '../../form-fields/models/form-field.model';
import { FormPrincipal } from '../../form-principal/models/form-principal.model';

@ObjectType()
@Table
export class Form extends Model {
  @Field(() => Int)
  declare id: number;

  @Field()
  @Column
  declare name: string;

  @Field(() => Int)
  @Column
  declare state: number;

  @Field(() => [FormField])
  @HasMany(() => FormField)
  declare formFields: FormField[];

  @Field(() => [FormPrincipal])
  @HasMany(() => FormPrincipal)
  declare formPrincipals: FormPrincipal[];
}
