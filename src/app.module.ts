import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { auth } from './auth/auth.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule.forRoot({
      auth,
    }),

    PrismaModule,
    UsersModule,
  ],
})
export class AppModule { }
