import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, HasMany, Model, Table, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Form } from '../../forms/models/form.model';

@ObjectType()
@Table
export class FormPrincipal extends Model {
  @Field(() => Int)
  declare id: number;

  @ForeignKey(() => Form)
  @Column
  @Field(() => Int)
  declare formId: number;

  @Field(() => Form)
  @BelongsTo(() => Form)
  declare form: Form;

  @Field(() => Int)
  @Column
  declare principal: number;

  @Field(() => Int)
  @Column
  declare role: number;

  @Field()
  @Column
  declare name: string;

  @Field(() => Int)
  @Column
  declare status: number;
}

