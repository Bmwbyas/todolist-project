import {appSetError, appSetStatus} from "../app/app-reducer";
import {AppDispatchType} from "../app/store";
import {ResponseApiType} from "../api/todolist-api";


export const handleServerNetworkError = (dispatch: any, error: { message: string }) => {
    dispatch(appSetStatus({status:"failed"}))
    dispatch(appSetError({error:error.message?error.message:"some error occurred"}))
}
export const handleServerAppError =<T>(dispatch:any,data:ResponseApiType<T>)=>{
    if(data.messages.length){
        dispatch(appSetError({error:data.messages[0]}))
    }else{
        dispatch(appSetError({error:'some error occurred'}))
    }
    dispatch(appSetStatus({status:"failed"}))
}
