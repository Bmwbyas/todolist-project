import {appReducer, appSetError, appSetStatus} from "./app-reducer";
import {AppInitialStateType} from "./app-reducer";

let startState: AppInitialStateType ;

beforeEach(() => {

    startState = {status: "idle",error: null,isInitialized:false}
})

test('status should be changed', () => {
    const endState = appReducer(startState, appSetStatus({status:"succeeded"}))

    expect(endState.error).toBe(null);
    expect(endState.status).toBe("succeeded");
});
test('error should be changed', () => {
    const endState = appReducer(startState, appSetError({error:"error"}))

    expect(endState.error).toBe("error");
    expect(endState.status).toBe("idle");
});
