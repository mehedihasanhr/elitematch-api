import 'express';

type JWTUser = {
  id: number;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: CurrentUserPayload;
    }
  }
}
