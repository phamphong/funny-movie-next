/* Instruments */
import type { ReduxState } from '@/redux_store'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMovies = (state: ReduxState) => state.movie.movies;

export const selectMoviePaging = (state: ReduxState): BasePaging => ({
  pageIndex: state.movie.pageIndex,
  pageSize: state.movie.pageSize,
});

export const selectTotalMovies = (state: ReduxState) => state.movie.total;
