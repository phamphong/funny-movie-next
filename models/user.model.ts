import { models, model, Schema, Model } from 'mongoose';

type IUserModel = Model<IUser>

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  collection: "users"
});

const UserModel: IUserModel = models?.User || model<IUser>('User', UserSchema);

export default UserModel
