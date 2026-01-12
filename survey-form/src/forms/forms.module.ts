import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Form } from './models/form.model';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormsResolver } from './forms.resolver';

import { AuthModule } from '../auth/auth.module';

import { FormField } from '../form-fields/models/form-field.model';
import { FormPrincipal } from '../form-principal/models/form-principal.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Form, FormField, FormPrincipal]),
    AuthModule,
  ],
  controllers: [FormsController],
  providers: [FormsService, FormsResolver],
})
export class FormsModule {}
