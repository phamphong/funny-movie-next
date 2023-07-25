import { MovieItem } from './movie-item';
import { loadMovies, selectTotalMovies, useDispatch, useSelector } from '@/redux_store';
import { selectMovies } from '@/redux_store/slices/movieSlice';
import useScrollLoadMore from '@/components/common/useScrollLoadMore';
import { useEffect } from 'react';
import { Spinner } from '@/components/common/spinner';

export const MovieList = () => {

  const list = useSelector(selectMovies);
  const total = useSelector(selectTotalMovies);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading, setIsEnded] = useScrollLoadMore(loadMoreMovies);

  useEffect(() => {
    if (list.length === total) {
      setIsEnded(true);
    }
  }, [list, total, setIsEnded])

  function loadMoreMovies() {
    if (list.length < total) {
      dispatch(loadMovies(false)).then(() => {
        setIsLoading(false);
      })
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      {list.map((movie, index) =>
        <MovieItem key={index} movie={movie} />
      )}
      {list.length === 0 ?
        <div data-cy="movie-empty" className='font-bold text-lg text-center'> Can&apos;t find any movies, be the first to share!</div>
        :
        list.length === total &&
        <div data-cy="movie-end" className='font-bold text-lg text-center'>Wow! You have watched all movies.</div>
      }

      {isLoading &&
        <div data-cy="movie-loading" className='text-center h-10'>
          <Spinner />
        </div>
      }
    </div>
  );
}
