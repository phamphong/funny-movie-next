/* Instruments */

import { ReduxDispatch, ReduxThunkAction } from "@/redux_store";
import { uiSlice } from "./slice";

export const pushNotify = (notify: INotify): ReduxThunkAction => {
  return async (dispatch) => {

    dispatch(uiSlice.actions.pushNotify(notify));
    setTimeout(() => dispatch(uiSlice.actions.shiftNotify()), 5000);
  };
}
