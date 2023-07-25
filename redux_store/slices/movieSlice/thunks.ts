/* Instruments */
import { createAppAsyncThunk } from '@/redux_store/createAppAsyncThunk'
import { loadMovieAPI, shareMovieAPI } from './api'
import { selectMoviePaging } from '@/redux_store'

export const loadMovies = createAppAsyncThunk(
  'movie/loadMovies',
  async (isFirstPage: boolean, { getState }) => {
    let storePaging = selectMoviePaging(getState());
    let nextPageIndex = isFirstPage ? 1 : storePaging.pageIndex + 1;
    const response = await loadMovieAPI(nextPageIndex, storePaging.pageSize);
    return {
      data: response.data?.data,
      total: response.data?.total,
      pageIndex: nextPageIndex,
    }
  }
)

export const shareMovie = createAppAsyncThunk(
  'movie/shareMovie',
  async (movie: ShareMovieRequest, { rejectWithValue }) => {
    try {
      const response = await shareMovieAPI(movie);
      return response
    } catch (err: any) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)
