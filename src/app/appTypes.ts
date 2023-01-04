export type AppInitialStateType = {
    status: RequestStatusType,
    error: null | string,
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'