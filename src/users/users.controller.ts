import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto.js';
import { Session } from '@thallesp/nestjs-better-auth';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { ResponseMessage } from '../common/decorator/response-message.decorator.js';
import { CurrentUser } from '../common/decorator/current-user.decorator.js';
import { avatarUploadOptions } from '../common/utils/file-upload.util.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get current authenticated user session
   */
  @Get('me')
  @ResponseMessage('Current user session fetched successfully')
  getMe(@Session() session: any) {
    return session;
  }

  /**
   * Self-profile update for authenticated user with optional image upload
   */
  @Patch('profile')
  @UseInterceptors(FileInterceptor('image', avatarUploadOptions))
  @ResponseMessage('Profile updated successfully')
  updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.usersService.updateProfile(userId, dto, file);
  }

  /**
   * List all users (Admin only)
   */
  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ResponseMessage('All users fetched successfully')
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Create a new user (Admin only)
   */
  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ResponseMessage('User created successfully')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  /**
   * Get a specific user by ID
   */
  @Get(':id')
  @ResponseMessage('User fetched successfully')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Admin update endpoint to modify any user's profile, role, verification status, and avatar
   */
  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image', avatarUploadOptions))
  @ResponseMessage('User updated by admin successfully')
  adminUpdate(
    @Param('id') id: string,
    @Body() dto: AdminUpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.usersService.adminUpdateUser(id, dto, file);
  }

  /**
   * Delete a user (Admin only)
   */
  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ResponseMessage('User deleted successfully')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}