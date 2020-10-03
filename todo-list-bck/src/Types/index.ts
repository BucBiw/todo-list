import { Request, Response } from 'express';
import { Profile } from 'passport-facebook';

export enum RoleOpions {
  client = 'CLIENT',
  itemEditor = 'ITEMEDITOR',
  admin = 'ADMIN',
  superAdmin = 'SUPERADMIN'
}

export interface AppRequest extends Request {
  userId?: string
  tokenVersion?: number
  userProfile?: Profile
}

export interface AppContext {
  req: AppRequest
  res: Response
}

export interface Item {
  key: string
  text: string
  date: Date
}