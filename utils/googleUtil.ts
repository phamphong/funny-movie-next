import axios from "axios"
import { validateYoutubeURL } from "./validateYoutubeURL"

export const youtubeInfo = async (url: string) => {
  const key = process.env.GOOGLE_API_KEY;
  let validYoutube = validateYoutubeURL(url);
  if (validYoutube) {
    let res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${key}&part=snippet&id=${validYoutube}`
    );
    return res.data?.items[0]?.snippet;
  }
}
