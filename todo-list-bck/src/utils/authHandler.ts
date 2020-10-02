import { AppRequest } from './../Typrs/index';
import { UserModel } from './../entities/User';


export const isAuthenticated = async (req: AppRequest) => {

  if (!req.userId) throw new Error('Please log in to proceed.');
  //query user from db
  const user = await UserModel.findById(req.userId);
  if (!user) throw new Error('Not Authenticated');

  //check token version
  if (req.tokenVersion !== user.tokenVersion) throw new Error('Not Authenticated');

  return user;
}