import { validateUsername, validateEmail, validatePassword } from './../utils/validate';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs';

import { User, UserModel } from './../entities/User';
import { createToken } from 'typescript';
import { RoleOpions } from './../Typrs/index';

@Resolver()
export default class TodoResolvers {
  @Query(() => [User], {nullable: 'items'}) //[User]!
  async users(): Promise<User[] | null> {
    try {
      console.log(UserModel)
      return UserModel.find();
    } catch (error) {
      throw (error);
    }
  }

  @Mutation(() => User)
  async signUp(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: { req: Request; res: Response;}
  ) {
    try {
      //Validate username
      if (!username) throw new Error('Username is required.');
      const isUsernameValid = validateUsername(username);
      if (!isUsernameValid) throw new Error('Username must be 6 - 60 charecters.');

      //Validate email
      if (!email) throw new Error('Email is required.');
      const isEmailValid = validateEmail(email);
      if (!isEmailValid) throw new Error('Email is invalid. (exp: something@email.com)')
      
      //Validate password
      if (!password) throw new Error('Password is require.');
      const isPassword = validatePassword(password);
      switch (isPassword) {
        case 1:
          throw new Error('Password must be 6 charecters.')
          break;
        case 2:
          throw new Error('Password must have lowercase and uppercase charecters.')
          break;
        default:
          break;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        createdAt: Date.now() + 60 * 60 * 1000 * 7,
        roles: [RoleOpions.client],
        todoList: [],
        tokenVersion: 0,
        facebookID: '',
        resetPasswordToken: '',
        resetPasswordTokenExpiry: 0
      });
      await newUser.save()

      //Create Token
      const token = createToken()
      //Send token to frontend
      res.cookie('jwt', 'test', {httpOnly: true})
      return newUser;
    } catch (error) {
      throw(error)
    }
  }
}