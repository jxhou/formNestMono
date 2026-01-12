import { Module } from '@nestjs/common';
import { FormPrincipalService } from './form-principal.service';
import { FormPrincipalController } from './form-principal.controller';
import { FormPrincipalResolver } from './resolvers/form-principal.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormPrincipal } from './models/form-principal.model';
import { Form } from '../forms/models/form.model';

@Module({
  imports: [SequelizeModule.forFeature([FormPrincipal, Form])],
  controllers: [FormPrincipalController],
  providers: [FormPrincipalService, FormPrincipalResolver],
})
export class FormPrincipalModule {}
