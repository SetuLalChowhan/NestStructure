import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Session } from '@thallesp/nestjs-better-auth';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get('me')
  getMe(@Session() session: any) {
    return session;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }


}