/* Components */
import { wrapper } from '@/redux_store';
import { loadMovies } from '@/redux_store/slices/movieSlice';
import { MovieList } from '@/components/movie/movie-list';

export default function IndexPage() {
  return <MovieList />
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(loadMovies(true));
  return {
    props: {}
  }
})
