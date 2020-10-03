import { Response } from 'express';

import { sendToken, createToken } from './../utils/tokenHandler';
import { UserModel, User } from './../entities/User';
import { AppRequest } from './../Types';

export const FBAuthenticate = async (req: AppRequest, res: Response) => {
  if (!req.userProfile) return
  
  const { id, emails, displayName, provider } = req.userProfile;
  try {
      //Query user in db
      const user = await UserModel.findOne({ facebookID: id });
      if (!user) {
          //New User
          const newUser = await UserModel.create <
              Pick<User, 'username' | 'email' | 'facebookID' | 'password'>
              >({
                  username: displayName,
                  email: (emails && emails[0].value) || provider,
                  facebookID: id,
                  password: provider
          })
      
          await newUser.save();

          //create token
          const token = createToken(newUser.id, newUser.tokenVersion);
          //send token to the frontend
              sendToken(res, token);
          //Redirect user to the frontend --> app
          res.redirect('http://localhost:3000/app');   
      } else {
          //Old user

      }
  } catch (error) {
      res.redirect('http://localhost:3000');
  }
}