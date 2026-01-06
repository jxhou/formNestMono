import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Form } from './models/form.model';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormsResolver } from './forms.resolver';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Form]), AuthModule],
  controllers: [FormsController],
  providers: [FormsService, FormsResolver],
})
export class FormsModule {}
