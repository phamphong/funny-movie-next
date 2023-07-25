import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthenUser } from '@/utils/authUtil';
import { serialize } from 'cookie';

interface RequestWithBody extends NextApiRequest {
}

export default async function handler(req: RequestWithBody, res: NextApiResponse<BaseResponse<UserLoginData>>) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        success: false,
        message: "Request not found"
      })
    }
    let userAuth = await getAuthenUser(req);
    if (!userAuth.user) {
      return res.status(401).send(userAuth.response!);
    }

    res.setHeader('Set-Cookie', serialize('token', "", { path: '/' }));

    res.status(200).json({
      success: true,
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Authorize Error"
    })
  }
}
