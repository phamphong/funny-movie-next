import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthenUser } from '@/utils/authUtil';
import dbConnect from '@/utils/dbConnect';
import MovieModel from '@/models/movie.model';
import { youtubeInfo } from '@/utils/googleUtil';
import { validateYoutubeURL } from '@/utils/validateYoutubeURL';
import { wsUtil } from '@/utils/wsUtil';

interface RequestWithBody extends NextApiRequest {
  body: { url: string }
}

export default async function handler(req: RequestWithBody, res: NextApiResponse<BaseResponse<any>>) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Request not found"
      })
    }
    let userAuth = await getAuthenUser(req);
    if (!userAuth.user) {
      return res.status(401).send(userAuth.response!);
    }

    let url = req.body.url;

    let validYoutube = validateYoutubeURL(url);
    if (!validYoutube) {
      return res.status(400).json({
        success: false,
        message: "Movie URL is not valid"
      });
    }

    let videoInfo = await youtubeInfo(url);

    if (videoInfo) {
      await dbConnect();
      let movie = {
        title: videoInfo.title,
        code: validYoutube,
        description: videoInfo.description,
        url: url,
        user_email: userAuth.user.email,
      }
      await MovieModel.create(movie)

      wsUtil.broadcast({
        message: "new_movie",
        data: movie
      })

      return res.status(200).json({
        success: true,
        data: movie
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "Video URL is not valid"
      });
    }

  } catch (error: any) {
    console.error(error.code);
    console.error(error.message);
    if (error.code === 11000) {
      console.error('Duplicate movie blocked!');
      return res.status(400).json({
        success: false,
        message: "Duplicate movie"
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Unhandled Error"
      })
    }
  }
}
