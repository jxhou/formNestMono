import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Form } from '../../forms/models/form.model';

@ObjectType()
@Table
export class FormField extends Model {
  @Field(() => Int)
  declare id: number;

  @ForeignKey(() => Form)
  @Column
  @Field(() => Int)
  declare formId: number;

  @Column
  @Field()
  declare name: string;

  @Column
  @Field()
  declare type: string;

  @Column({ defaultValue: false })
  @Field()
  declare required: boolean;

  @Column({ defaultValue: 0 })
  @Field(() => Int)
  declare order: number;

  @Column({ defaultValue: true })
  @Field()
  declare active: boolean;

  @BelongsTo(() => Form)
  @Field(() => Form)
  declare form: Form;
}
