import dbConnect from './dbConnect';
import { NextApiRequest } from 'next';
import { IncomingMessage } from 'http';
import { decodeToken } from './tokenUtil';
import { parse } from 'cookie';
import UserModel from '@/models/user.model';
import { NextRequest } from 'next/server';

export const getAuthenUser = async (req: NextApiRequest | IncomingMessage) => {
  let cookie = parse(req.headers.cookie ?? "");
  let token = cookie["token"];
  if (token) {
    let decodedToken = decodeToken(token);
    if (decodedToken) {
      await dbConnect();
      let user = await UserModel.findOne({ email: decodedToken.email }).exec();
      if (user) {
        return {
          user,
          token
        };
      }
    }
  }
  return {
    response: {
      success: false,
      message: "Authorize Error"
    }
  }
}
