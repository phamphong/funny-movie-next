import { axiosClient } from "@/redux_store/slices/base_api";

export const loadMovieAPI = async (
  pageIndex = 1, pageSize = 10
): Promise<BaseResponse<MoviesResponse>> => {
  const response = await axiosClient.post<BaseResponse<MoviesResponse>>("/api/movie/search", {
    pageSize, pageIndex
  });
  return response.data
}

export const shareMovieAPI = async (
  movie: ShareMovieRequest
): Promise<BaseResponse<IMovie>> => {
  const response = await axiosClient.post<BaseResponse<IMovie>>("/api/movie/share", movie);
  console.warn(response);
  return response.data
}
