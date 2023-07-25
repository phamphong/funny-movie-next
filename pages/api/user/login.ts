import dbConnect from '@/utils/dbConnect';
import UserModel from '@/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'
import { encodeToken } from '@/utils/tokenUtil';
import { serialize } from 'cookie';

interface RequestWithBody extends NextApiRequest {
  body: IUser;
}

export default async function handler(req: RequestWithBody, res: NextApiResponse<BaseResponse<UserInfoResponse>>) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Request not found"
      })
    }
    await dbConnect();

    let body = req.body

    const user = await UserModel.findOne({ email: body.email });

    if (user) {
      let isAuthen = await bcrypt.compare(body.password!, user.password!);
      if (isAuthen) {
        let token = encodeToken({ email: user.email });
        res.setHeader('Set-Cookie', serialize('token', token, { path: '/' }));
        res.status(200).json({
          success: true,
          data: {
            email: user.email,
          },
          message: "Login successfully"
        })
      } else {
        res.status(401).json({
          success: false,
          message: "Unauthorized"
        })
      }
    } else {
      let newUser = await UserModel.create({
        email: body.email,
        password: await bcrypt.hash(body.password!, bcrypt.genSaltSync(10))
      });
      if (newUser) {
        let token = encodeToken({ email: newUser.email });
        res.setHeader('Set-Cookie', serialize('token', token, { path: '/' }));
        res.status(200).json({
          success: true,
          data: {
            email: newUser.email
          },
          message: "Login successfully"
        })
      }
    }
  } catch (error) {
    console.error("Authorize Error", error);
    res.status(500).json({
      success: false,
      message: "Authorize Error"
    })
  }
}
