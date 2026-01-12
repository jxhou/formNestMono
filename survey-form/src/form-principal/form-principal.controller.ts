import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormPrincipalService } from './form-principal.service';
import { CreateFormPrincipalDto } from './dto/create-form-principal.dto';
import { UpdateFormPrincipalDto } from './dto/update-form-principal.dto';

@Controller('from-principal')
export class FormPrincipalController {
  constructor(private readonly FormPrincipalService: FormPrincipalService) {}

  @Post()
  create(@Body() createFormPrincipalDto: CreateFormPrincipalDto) {
    return this.FormPrincipalService.create(createFormPrincipalDto);
  }

  @Get()
  findAll() {
    return this.FormPrincipalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.FormPrincipalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormPrincipalDto: UpdateFormPrincipalDto) {
    return this.FormPrincipalService.update(+id, updateFormPrincipalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.FormPrincipalService.remove(+id);
  }
}
