//import rendomBypt from 'randombytes'
import { isAuthenticated } from './../utils/authHandler';
import { Resolver, Query, Mutation, Arg, Ctx, ObjectType, Field } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User, UserModel } from './../entities/User';
import { RoleOpions, AppContext } from './../Typrs';
import { sendToken, createToken } from './../utils/tokenHandler';
import { validateUsername, validateEmail, validatePassword } from './../utils/validate';

@ObjectType()
export class ResponseMessage{
  @Field()
  message: string
}

@Resolver()
export default class TodoResolvers {
  @Query(() => [User], { nullable: 'items' }) //[User]!
  async users(@Ctx() {req}: AppContext): Promise<User[] | null> {
    try {
      const user = await isAuthenticated(req);
      // Check Admin And Superadmin
      const isAuthorized = user.roles.includes(RoleOpions.superAdmin) || user.roles.includes(RoleOpions.admin);

      if (!isAuthorized) throw new Error('No Authorization')

      return UserModel.find().sort({createdAt: 'desc'});
    } catch (error) {
      throw (error);
    }
  }

  @Query(() => User, { nullable: true }) //User
  async me(@Ctx() { req }: AppContext): Promise<User | null> {
    try {
      const user = await isAuthenticated(req);

      return user;
    } catch (error) {
      throw (error);
    }
  }

  @Mutation(() => User, { nullable: true })
  async signup(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: AppContext
  ): Promise<User | null> {
    try {
      //check empty data to sign up
      if (!username) throw new Error('Username is required.');
      if (!email) throw new Error('Email is required.');
      if (!password) throw new Error('Password is require.');

      const user = await UserModel.findOne({ email });
      if (user) throw new Error('Email already in use, Please sign in instead.')

      //validate username
      const isUsernameValid = validateUsername(username);
      if (!isUsernameValid) throw new Error('Username must be 6 - 60 charecters.');

      //validate email
      const isEmailValid = validateEmail(email);
      if (!isEmailValid) throw new Error('Email is invalid. (exp: something@email.com)')

      //validate password
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
      //encode password
      const hashedPassword = await bcrypt.hash(password, 10);

      //create new user
      const newUser = await UserModel.create<Pick<User, 'username'| 'email' | 'password'>>({
        username,
        email,
        password: hashedPassword
      });
      await newUser.save()

      //Create Token
      const token = createToken(newUser.id, newUser.tokenVersion)

      //Send token to frontend
      sendToken(res, token)

      return newUser;
    } catch (error) {
      throw (error)
    }
  }

  @Mutation(() => User, { nullable: true })
  async signin(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: AppContext
  ): Promise<User | null> {
    try {
      //check empty data to sign up
      if (!email) throw new Error('Email is required.');
      if (!password) throw new Error('Password is require.');

      //check user is exist in DB
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error('Email not found.');

      //check password is valid
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error('Email or Password is invalid.');

      //Create Token
      const token = createToken(user.id, user.tokenVersion);

      //Send token to frontend
      sendToken(res, token);
      return user;
    } catch (error) {
      throw (error)
    }
  }

  @Mutation(() => ResponseMessage, { nullable: true })
  async signout(
    @Ctx() { req, res }: AppContext
  ): Promise<ResponseMessage | null> {
    try {
      const user = await UserModel.findById(req.userId);

      if (!user) return null

      //Bump up token version 
      user.tokenVersion = user.tokenVersion + 1;
      await user.save()

      //clear cookie in brownser
      res.clearCookie(process.env.COOKIE_NAME!);
      
      return {message: "Good Bye"};
    } catch (error) {
      throw (error)
    }
  }

  @Mutation(() => User, { nullable: true })
  async updateRoles(
    @Arg('newRoles', () => [String]) newRoles: RoleOpions[],
    @Arg('userId') userId: string,
    @Ctx() {req}: AppContext
  ) {
    try {
      const admin = await isAuthenticated(req);
      if (!admin) throw new Error('Not authenticated.');

      const isSuperAdmin = admin.roles.includes(RoleOpions.superAdmin);
      if (!isSuperAdmin) throw new Error('No Authorization.');

      //Query user to be update
      const user = await UserModel.findById(userId);
      if(!user) throw new Error('User not found.')
      //update roles
      user.roles = newRoles;

      await user.save();
      return user;
    } catch (error) {
      throw (error);
    }
  }

  // @Mutation(() => User, { nullable: true })
  // async requestResetPassword(
  //   @Arg('email') email: string
  // ): Promise<User | null> {
  //   try {
  //     //check empty data to sign up
  //     if (!email) throw new Error('Email is required.');

  //     //check user is exist in DB
  //     const user = await UserModel.findOne({ email });
  //     if (!user) throw new Error('Email not found.');

  //     const resetPasswordToken = rendomBypt(16).toString('hex');
  //     const resetPasswordTokenExpiry = Date.now() + 1000 * 60 * 30;

  //     const updatedUser = await UserModel.findOneAndUpdate({ email }, { resetPasswordToken, resetPasswordTokenExpiry }, { new: true });
      
  //     if (!updatedUser) throw new Error('Sorry, cannot process.');

  //     //check password is valid

  //     return user;
  //   } catch (error) {
  //     throw (error)
  //   }
  // }
}