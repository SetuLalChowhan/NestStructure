import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { sendEmail } from './email.js';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:3000'],

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'USER',
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    sendOnSignUp: true,

    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail(
        user.email,
        'Verify your email address',
        `
          <h2>Welcome, ${user.name}!</h2>

          <p>Please verify your email address:</p>

          <p>
            <a href="${url}">Verify Email</a>
          </p>

          <p>If you did not create this account, you can ignore this email.</p>
        `,
      );
    },
  },
});