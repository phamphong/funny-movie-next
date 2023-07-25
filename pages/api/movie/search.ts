import MovieModel from '@/models/movie.model';
import dbConnect from '@/utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';

interface RequestWithBody extends NextApiRequest {
  body: BasePaging
}

export default async function handler(req: RequestWithBody, res: NextApiResponse<BaseResponse<any>>) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Request not found"
      })
    }

    await dbConnect();

    let { pageIndex, pageSize } = req.body;

    let result = await MovieModel.find({})
      .limit(pageSize * 1)
      .skip((pageIndex - 1) * pageSize)
      .sort({ _id: -1 }).exec();
    const count = await MovieModel.countDocuments();

    return res.json({
      success: true,
      data: {
        data: result,
        total: count
      }
    })


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unhandled Error"
    })
  }
}
