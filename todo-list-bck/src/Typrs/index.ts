import { Request, Response } from 'express';

export enum RoleOpions {
  client = 'CLIENT',
  itemEditor = 'ITEMEDITOR',
  admin = 'ADMIN',
  superAdmin = 'SUPERADMIN'
}

export interface AppRequest extends Request {
  userId?: string
  tokenVersion?: number
  userProfile?: number
}

export interface AppContext {
  req: AppRequest
  res: Response
}