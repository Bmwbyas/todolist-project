
import {AppRootStateType} from "./store";

export const selectStatus = (state:AppRootStateType) => state.app.status
export const selectisInitialized = (state:AppRootStateType) => state.app.isInitialized
