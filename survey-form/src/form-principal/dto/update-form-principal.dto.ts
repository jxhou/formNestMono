import { PartialType } from '@nestjs/mapped-types';
import { CreateFormPrincipalDto } from './create-form-principal.dto';

export class UpdateFormPrincipalDto extends PartialType(CreateFormPrincipalDto) {}
