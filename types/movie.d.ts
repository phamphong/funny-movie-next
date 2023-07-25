type IMovie = {
  title: string;
  code: string;
  url: string;
  description: string;
  user_email?: string;
}

type MoviesResponse = {
  data: IMovie[],
  total: number,
}

type ShareMovieRequest = {
  url: string
}
