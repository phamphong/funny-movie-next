/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'


const initialState: UISliceState = {
  notifyList: [],
  loadingCount: 0,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pushNotify: (state, action: PayloadAction<INotify>) => {
      state.notifyList = [...state.notifyList, action.payload]
    },
    shiftNotify: (state) => {
      state.notifyList = state.notifyList.slice(1)
    },
  },
})

/* Types */
export interface UISliceState {
  notifyList: INotify[],
  loadingCount: number,
}
