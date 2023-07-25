/* Instruments */
import { movieSlice, uiSlice, userSlice } from './slices'

export const reducer = {
  ui: uiSlice.reducer,
  movie: movieSlice.reducer,
  user: userSlice.reducer,
}
