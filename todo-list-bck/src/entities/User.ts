import { RoleOpions } from './../Typrs/index';
import { arrayProp, getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: 'User Model' })
export class User {
  @Field(() => ID)
  id: string

  @Field()
  @prop({ required: true, trim: true, unique: true })
  username: string

  @Field()
  @prop({ required: true, trim: true, unique: true })
  email: string

  @prop({ required: true, trim: true })
  password: string

  @Field(() => [Todo])
  @prop({default: []})
  todoList: Todo[]

  @prop({ default: 0 })
  tokenVersion: number

  @prop({default: ''})
  resetPasswordToken?: string

  @prop({default: 0})
  resetPasswordTokenExpiry?: number

  @prop({default: ''})
  facebookID?: string
  
  @Field(() => [String])
  @arrayProp({
    item: String,
    enum: RoleOpions,
    default: [RoleOpions.client]
  } )
  roles: RoleOpions[]

  @Field()
  @prop({ default: () => Date.now() + 60 * 60 * 1000 * 7 })
  createdAt: Date
}

@ObjectType({ description: 'Todo Model' })
class Todo {
  @Field()
  key: string

  @Field()
  text: string

  @Field()
  date: Date
}

export const UserModel = getModelForClass(User);

// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   todoList: [{
//     key: String,
//     text: String,
//     date: Date
//   }]
// });

// export const UserModel = mongoose.model('User', UserSchema);