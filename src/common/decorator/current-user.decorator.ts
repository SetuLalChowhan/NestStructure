import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUserPayload {
  id: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: string;
  [key: string]: any;
}

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // Support better-auth session attachment, req.user, or req.session.user
    const user: CurrentUserPayload | undefined =
      request.user || request.session?.user || request.session;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
